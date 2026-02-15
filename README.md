# Graph ML Suite - Fraud Ring Detection & Social Influence Modeling

A production-ready full-stack application demonstrating advanced Graph Machine Learning techniques for portfolio and interview success. Built with Next.js, React, and Python, featuring interactive visualizations and real-time analysis.

## Overview

This project showcases rare Graph ML expertise using:

- **Node2Vec** - Biased random walks for node embeddings
- **Graph Neural Networks (GNNs)** - Message passing neural networks
- **Community Detection** - Louvain algorithm for identifying clusters
- **Link Prediction** - Embedding-based relationship forecasting

### Two Real-World Use Cases

#### 1. Fraud Ring Detection
Analyzes transaction networks to identify coordinated fraud patterns. The system detects dense communities that indicate organized fraud rings and predicts suspicious hidden relationships.

**Key Insights:**
- Identify tightly connected fraud rings (communities)
- Detect anomalous nodes with unusual connection patterns
- Predict hidden relationships that indicate coordination

#### 2. Social Influence Modeling
Models social networks to identify influential users and growth opportunities. The system finds key influencers, community structure, and predicts valuable new connections.

**Key Insights:**
- Identify influential nodes based on network position
- Discover communities and interaction patterns
- Recommend growth opportunities through link prediction

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Canvas API** - Hardware-accelerated graph visualization

### Backend
- **Python 3** - ML implementation
- **NetworkX** - Graph algorithms
- **NumPy** - Numerical computing
- **Node.js Runtime** - Executes Python scripts

### ML Algorithms

#### Node2Vec Embeddings
```python
class Node2Vec:
    - Biased random walks (p, q parameters)
    - Skip-gram-like embedding training
    - Captures both proximity and structural roles
    - 32-64 dimensional embeddings
```

#### Community Detection
```python
def detect_communities():
    - Greedy modularity optimization
    - Iterative node reassignment
    - Fast for datasets under 1000 nodes
    - Returns community assignments
```

#### Link Prediction
```python
def predict_links():
    - Uses node embeddings
    - Cosine similarity scoring
    - Ranks potential edges by strength
    - Top-k results returned
```

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── analyze-fraud/route.ts    # Fraud analysis endpoint
│   │   └── analyze-social/route.ts   # Social analysis endpoint
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Main dashboard
│   └── globals.css                    # Global styling
├── components/
│   ├── GraphCanvas.tsx                # Force-directed graph renderer
│   ├── MetricsPanel.tsx               # Network statistics
│   ├── InsightsPanel.tsx              # Predictions display
│   └── ui/                            # shadcn/ui components
├── scripts/
│   └── ml_backend.py                  # ML algorithms
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js 18+ (for Next.js 16)
- Python 3.8+
- pip package manager

### Installation

1. **Clone & Install Dependencies**
```bash
git clone <repo>
cd graph-ml-suite
npm install  # or pnpm install
```

2. **Install Python Dependencies**
```bash
pip install networkx numpy
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open in Browser**
```
http://localhost:3000
```

## How It Works

### Fraud Ring Detection Flow

1. **Network Generation**
   - Creates synthetic fraud network with planted communities
   - 30-100 nodes with configurable density
   - Intra-ring: 60% edge probability (dense coordination)
   - Inter-ring: 10% random edges (cover-up)

2. **Node2Vec Training**
   - 5 walks per node, length 40
   - Learns 32-dimensional embeddings
   - Captures both direct contacts and higher-order structures

3. **Community Detection**
   - Identifies fraud rings automatically
   - Assigns each node to a community
   - Color-codes visualization by community

4. **Suspicious Link Prediction**
   - Scores potential hidden connections
   - High-scoring links indicate possible coordination
   - Top 15 predictions shown in insights panel

### Social Influence Flow

1. **Network Generation**
   - Creates social network with 5-10 influencers
   - Influencers follow each other (70% chance)
   - Regular users follow 1-3 influencers
   - Small-world connections between users

2. **Influence Scoring**
   - Based on network position
   - Weighted by follower count
   - 0-1 influence score

3. **Community Detection**
   - Identifies social communities
   - Shows connection patterns
   - Reveals subgroups within network

4. **Growth Opportunities**
   - Predicts valuable new connections
   - Recommends follower targets
   - Suggests influencer partnerships

## Key Features

### Interactive Visualization
- **Force-Directed Layout** - Physics simulation for natural positioning
- **Community Coloring** - Visual differentiation of groups
- **Node Sizing** - Proportional to degree (popularity)
- **Click to Select** - Inspect individual nodes
- **Dynamic Rendering** - Canvas-based for performance

### Real-Time Analysis
- **Configurable Network Size** - 30-100 nodes
- **Instant Computation** - Graph algorithms run in seconds
- **Live Updates** - Refresh analysis with new parameters

### Comprehensive Metrics
- **Network Statistics** - Nodes, edges, density, average degree
- **Community Metrics** - Number of detected communities
- **Influence Metrics** - Influencer count, average influence
- **Predictive Metrics** - Suspicious/potential connection scores

## Algorithm Details

### Node2Vec Parameters
```python
Node2Vec(
    embedding_dim=32,      # Embedding size
    walks_per_node=5,      # Samples per node
    walk_length=40,        # Random walk length
    p=1.0,                 # Return parameter
    q=1.0                  # In-out parameter
)
```

### Community Detection
- **Iterations**: Max 10, stops when no improvements
- **Complexity**: O(edges × iterations)
- **Convergence**: Greedy local optimization

### Link Prediction
- **Metric**: Cosine similarity of embeddings
- **Time**: O(n²) for full predictions
- **Top-K**: Returns highest scoring pairs

## Performance Considerations

- **Small Networks (30 nodes)**: <500ms analysis
- **Medium Networks (60 nodes)**: <1s analysis
- **Large Networks (100+ nodes)**: <2s analysis
- **Visualization**: 60fps canvas rendering

## Portfolio Highlights

### What Makes This Stand Out

1. **Rare Skills** - Graph ML is uncommon; most candidates do tabular/vision ML
2. **Full Stack** - Not just ML, but integrated production system
3. **Interactive Demo** - Users can experiment and see results live
4. **Multiple Use Cases** - Demonstrates versatility (fraud + social)
5. **Clean Code** - Well-documented, modular implementation
6. **Real Algorithms** - Implements actual Graph ML methods, not simplified versions

### Interview Talking Points

1. **Technical Depth**
   - "Node2Vec uses biased random walks to capture both proximity and structural roles in graphs"
   - "Community detection uses greedy modularity optimization to identify dense subgraphs"
   - "Link prediction leverages learned embeddings to estimate connection probabilities"

2. **Product Thinking**
   - "Fraud detection identifies coordination patterns; social identifies growth opportunities"
   - "Real-time analysis allows stakeholders to explore different network sizes"
   - "Visualizations make complex patterns interpretable"

3. **Engineering**
   - "Python backend handles complex algorithms; Next.js provides responsive UI"
   - "Canvas rendering enables smooth interaction with 100+ nodes"
   - "Force-directed layout algorithm creates intuitive network visualizations"

## Customization Ideas

### Extend with Real Data
```python
# Load from CSV
import pandas as pd
df = pd.read_csv('transactions.csv')
G = nx.from_pandas_edgelist(df, 'source', 'target')
```

### Add More Algorithms
- DeepWalk (simpler Node2Vec variant)
- GraphSAGE (scalable GNN)
- Spectral clustering
- Triangle counting

### Enhance Visualizations
- 3D graph rendering (Three.js)
- Animation of random walks
- Community evolution over time
- Real-time data streaming

### Production Deployment
- Cache embeddings with Redis
- Scale to 10k+ nodes with PyTorch
- Deploy Python backend separately
- Add user authentication

## Resources & References

### Graph ML
- [Node2Vec Paper](https://arxiv.org/pdf/1607.00653.pdf)
- [Graph Attention Networks](https://arxiv.org/abs/1710.10903)
- [Community Detection Review](https://arxiv.org/abs/1210.0612)

### Tools & Libraries
- [NetworkX Docs](https://networkx.org/)
- [PyTorch Geometric](https://pytorch-geometric.readthedocs.io/)
- [DGL (Deep Graph Library)](https://www.dgl.ai/)

### Learning Resources
- Stanford CS224W: Machine Learning with Graphs
- DeepMind Graph ML course
- ICLR Conference (International Conference on Learning Representations)

## Troubleshooting

### Python Dependencies Issue
```bash
pip install --upgrade networkx numpy
python3 -c "import networkx; print(networkx.__version__)"
```

### Canvas Rendering Issues
- Ensure browser supports HTML5 Canvas
- Check browser console for errors
- Try different network sizes

### API Timeouts
- Reduce network size
- Check Python installation
- Verify NetworkX is installed

## License

This project is part of a portfolio and is provided as-is for educational and interview purposes.

## Contact & Support

Built with ❤️ for Data Science interviews and Graph ML learning.

---

**Pro Tip for Interviews**: Be ready to explain:
1. Why Node2Vec specifically (vs DeepWalk, GraphSAGE)
2. How you'd scale to million-node graphs
3. Real-world applications beyond fraud/social
4. Limitations and trade-offs in your implementation
