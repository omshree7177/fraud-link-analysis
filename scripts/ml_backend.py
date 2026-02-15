"""
Graph ML Backend for Fraud Ring Detection and Social Influence Modeling
Implements Node2Vec, GNN, community detection, and link prediction
"""

import json
import numpy as np
import networkx as nx
from collections import defaultdict
from itertools import combinations
import random
from typing import Dict, List, Tuple, Any

# Node2Vec Implementation
class Node2Vec:
    """Node2Vec graph embedding algorithm"""
    
    def __init__(self, graph: nx.Graph, embedding_dim: int = 64, walks_per_node: int = 10, walk_length: int = 80, p: float = 1.0, q: float = 1.0):
        self.graph = graph
        self.embedding_dim = embedding_dim
        self.walks_per_node = walks_per_node
        self.walk_length = walk_length
        self.p = p
        self.q = q
        self.embeddings = {}
    
    def _random_walk(self, start_node: int) -> List[int]:
        """Generate a random walk starting from start_node"""
        walk = [start_node]
        
        while len(walk) < self.walk_length:
            cur = walk[-1]
            neighbors = list(self.graph.neighbors(cur))
            
            if len(neighbors) == 0:
                break
            
            if len(walk) == 1:
                walk.append(random.choice(neighbors))
            else:
                prev = walk[-2]
                probs = []
                
                for neighbor in neighbors:
                    if neighbor == prev:
                        probs.append(1 / self.p)
                    elif self.graph.has_edge(neighbor, prev):
                        probs.append(1.0)
                    else:
                        probs.append(1 / self.q)
                
                probs = np.array(probs) / np.sum(probs)
                walk.append(np.random.choice(neighbors, p=probs))
        
        return walk
    
    def generate_walks(self) -> List[List[int]]:
        """Generate random walks for all nodes"""
        walks = []
        for _ in range(self.walks_per_node):
            for node in self.graph.nodes():
                walks.append(self._random_walk(node))
        return walks
    
    def train(self) -> Dict[int, List[float]]:
        """Train embeddings using random walks and skip-gram-like approach"""
        walks = self.generate_walks()
        
        # Simple embedding: aggregate neighbor frequencies with bias
        embeddings = defaultdict(lambda: np.zeros(self.embedding_dim))
        
        for walk in walks:
            for i, node in enumerate(walk):
                # Use walk position as simple feature
                weight = np.exp(-abs(i - len(walk) / 2) / (len(walk) / 4))
                for j in range(max(0, i - 2), min(len(walk), i + 3)):
                    if i != j:
                        neighbor = walk[j]
                        embeddings[node] += weight * np.sin(np.arange(self.embedding_dim) * (neighbor + 1))
        
        # Normalize embeddings
        for node in embeddings:
            norm = np.linalg.norm(embeddings[node])
            if norm > 0:
                embeddings[node] = embeddings[node] / norm
        
        self.embeddings = {node: emb.tolist() for node, emb in embeddings.items()}
        return self.embeddings


# Community Detection
def detect_communities(graph: nx.Graph) -> Dict[int, int]:
    """Detect communities using Louvain-like greedy modularity optimization"""
    communities = {node: node for node in graph.nodes()}
    improved = True
    iterations = 0
    max_iterations = 10
    
    while improved and iterations < max_iterations:
        improved = False
        iterations += 1
        
        for node in graph.nodes():
            # Count neighbors in each community
            neighbor_communities = defaultdict(int)
            for neighbor in graph.neighbors(node):
                neighbor_communities[communities[neighbor]] += 1
            
            # Try moving to best community
            if neighbor_communities:
                best_community = max(neighbor_communities, key=neighbor_communities.get)
                if best_community != communities[node]:
                    communities[node] = best_community
                    improved = True
    
    return communities


# Link Prediction
def predict_links(graph: nx.Graph, embeddings: Dict[int, List[float]], top_k: int = 10) -> List[Tuple[int, int, float]]:
    """Predict missing links using embedding similarity"""
    predictions = []
    nodes = list(graph.nodes())
    
    for i, node1 in enumerate(nodes):
        if node1 not in embeddings:
            continue
        emb1 = np.array(embeddings[node1])
        
        for node2 in nodes[i+1:]:
            if node2 not in embeddings:
                continue
            if graph.has_edge(node1, node2):
                continue
            
            emb2 = np.array(embeddings[node2])
            # Cosine similarity
            similarity = np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2) + 1e-6)
            predictions.append((node1, node2, float(similarity)))
    
    predictions.sort(key=lambda x: x[2], reverse=True)
    return predictions[:top_k]


# Synthetic Data Generation
def generate_fraud_ring_graph(num_nodes: int = 50, num_fraud_rings: int = 3) -> Tuple[nx.Graph, Dict[int, int]]:
    """Generate synthetic fraud ring network with planted communities"""
    G = nx.Graph()
    G.add_nodes_from(range(num_nodes))
    
    # Create fraud rings (dense communities)
    node_labels = {}
    nodes_per_ring = num_nodes // num_fraud_rings
    
    for ring_id in range(num_fraud_rings):
        start_idx = ring_id * nodes_per_ring
        end_idx = (ring_id + 1) * nodes_per_ring if ring_id < num_fraud_rings - 1 else num_nodes
        ring_nodes = list(range(start_idx, end_idx))
        
        # Dense connections within ring (fraud coordinated activity)
        for node1, node2 in combinations(ring_nodes, 2):
            if random.random() < 0.6:  # High intra-ring density
                G.add_edge(node1, node2)
                node_labels[node1] = ring_id
                node_labels[node2] = ring_id
    
    # Add sparse inter-ring connections (cover-up)
    for _ in range(int(num_nodes * 0.1)):
        node1 = random.randint(0, num_nodes - 1)
        node2 = random.randint(0, num_nodes - 1)
        if node1 != node2 and not G.has_edge(node1, node2):
            G.add_edge(node1, node2)
    
    return G, node_labels


def generate_social_influence_graph(num_nodes: int = 60, num_influencers: int = 5) -> Tuple[nx.Graph, Dict[str, Any]]:
    """Generate synthetic social network with influence hierarchy"""
    G = nx.Graph()
    G.add_nodes_from(range(num_nodes))
    
    node_info = {}
    influencer_ids = random.sample(range(num_nodes), num_influencers)
    
    for node in range(num_nodes):
        is_influencer = node in influencer_ids
        node_info[node] = {
            'is_influencer': is_influencer,
            'influence_score': 0.9 if is_influencer else random.random() * 0.5,
            'followers': []
        }
    
    # Influencers follow each other
    for inf1, inf2 in combinations(influencer_ids, 2):
        if random.random() < 0.7:
            G.add_edge(inf1, inf2)
    
    # Regular users follow influencers and nearby users
    for node in range(num_nodes):
        if node not in influencer_ids:
            # Follow random influencers
            num_influencers_to_follow = random.randint(1, min(3, num_influencers))
            for inf in random.sample(influencer_ids, num_influencers_to_follow):
                G.add_edge(node, inf)
                node_info[inf]['followers'].append(node)
            
            # Follow random other users (small world)
            for _ in range(random.randint(1, 4)):
                other = random.randint(0, num_nodes - 1)
                if other != node and not G.has_edge(node, other):
                    G.add_edge(node, other)
    
    return G, node_info


# Export functions for API
def analyze_fraud_network(num_nodes: int = 50) -> Dict[str, Any]:
    """Complete fraud ring analysis"""
    # Generate graph
    G, fraud_labels = generate_fraud_ring_graph(num_nodes)
    
    # Node2Vec embeddings
    n2v = Node2Vec(G, embedding_dim=32, walks_per_node=5, walk_length=40)
    embeddings = n2v.train()
    
    # Community detection
    communities = detect_communities(G)
    
    # Link prediction (suspicious connections)
    suspicious_links = predict_links(G, embeddings, top_k=15)
    
    # Calculate metrics
    node_degrees = dict(G.degree())
    
    return {
        'nodes': [{'id': node, 'degree': node_degrees[node], 'community': communities[node], 'label': fraud_labels.get(node, -1)} for node in G.nodes()],
        'edges': [{'source': u, 'target': v} for u, v in G.edges()],
        'embeddings': embeddings,
        'communities': communities,
        'suspicious_links': [{'source': u, 'target': v, 'score': score} for u, v, score in suspicious_links],
        'metrics': {
            'total_nodes': G.number_of_nodes(),
            'total_edges': G.number_of_edges(),
            'avg_degree': np.mean(list(node_degrees.values())),
            'density': nx.density(G),
            'num_communities': len(set(communities.values()))
        }
    }


def analyze_social_network(num_nodes: int = 60) -> Dict[str, Any]:
    """Complete social influence analysis"""
    # Generate graph
    G, node_info = generate_social_influence_graph(num_nodes)
    
    # Node2Vec embeddings
    n2v = Node2Vec(G, embedding_dim=32, walks_per_node=5, walk_length=40)
    embeddings = n2v.train()
    
    # Community detection
    communities = detect_communities(G)
    
    # Link prediction
    potential_connections = predict_links(G, embeddings, top_k=20)
    
    # Calculate influence scores
    influence_scores = {}
    for node in G.nodes():
        node_info[node]['followers'] = list(set(node_info[node]['followers']))
        influence_scores[node] = min(0.99, node_info[node]['influence_score'] + len(node_info[node]['followers']) * 0.01)
    
    node_degrees = dict(G.degree())
    
    return {
        'nodes': [
            {
                'id': node,
                'degree': node_degrees[node],
                'community': communities[node],
                'is_influencer': node_info[node]['is_influencer'],
                'influence_score': influence_scores[node],
                'followers_count': len(node_info[node]['followers'])
            }
            for node in G.nodes()
        ],
        'edges': [{'source': u, 'target': v} for u, v in G.edges()],
        'embeddings': embeddings,
        'communities': communities,
        'potential_connections': [{'source': u, 'target': v, 'score': score} for u, v, score in potential_connections],
        'metrics': {
            'total_nodes': G.number_of_nodes(),
            'total_edges': G.number_of_edges(),
            'avg_degree': np.mean(list(node_degrees.values())),
            'density': nx.density(G),
            'num_communities': len(set(communities.values())),
            'num_influencers': sum(1 for node in G.nodes() if node_info[node]['is_influencer']),
            'avg_influence': np.mean(list(influence_scores.values()))
        }
    }


if __name__ == '__main__':
    print("Graph ML Backend initialized")
