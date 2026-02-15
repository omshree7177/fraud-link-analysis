# Fraud Link Analysis using Graph Machine Learning

A modern web-based application for detecting and analyzing fraudulent relationships using Graph Machine Learning techniques. This project visualizes suspicious connections between entities and helps uncover hidden fraud patterns using graph-based insights.

## Overview

This project showcases rare Graph ML expertise using:

- **Node2Vec** - Biased random walks for node embeddings
- **Graph Neural Networks (GNNs)** - Message passing neural networks
- **Community Detection** - Louvain algorithm for identifying clusters
- **Link Prediction** - Embedding-based relationship forecasting

#### 1. Fraud Ring Detection
Analyzes transaction networks to identify coordinated fraud patterns. The system detects dense communities that indicate organized fraud rings and predicts suspicious hidden relationships.

**Key Insights:**
- Identify tightly connected fraud rings (communities)
- Detect anomalous nodes with unusual connection patterns
- Predict hidden relationships that indicate coordination

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

## System Design

### Architecture Overview

```
┌─────────────────────────────────────────┐
│         FRONTEND (React + Next.js)      │
├─────────────────────────────────────────┤
│  Landing Page │ Dashboard │ Visualization
└────────────────────┬────────────────────┘
                     │ HTTP
┌────────────────────▼────────────────────┐
│      NEXT.JS API ROUTES                 │
│  /api/train  │  /api/score              │
└────────────────────┬────────────────────┘
                     │ Process
┌────────────────────▼────────────────────┐
│    ML PIPELINE (Python/JavaScript)      │
│  Feature Engineering → Model Training → Scoring
└─────────────────────────────────────────┘
```
## Getting Started

### Prerequisites
- Node.js 18+ (for Next.js 16)
- Python 3.8+
- pip package manager

### Installation

1. **Install Node.js** (if you haven't)
   - Download from https://nodejs.org
   - LTS version recommended

2. **Clone and Setup**
   ```bash
   cd your-project-folder
   npm install
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## How It Works


### 1. Upload & Analyze
- Simple CSV upload with user data (names, IP addresses, phone numbers)
- No registration, no setup, instant analysis
- Results delivered in seconds

### Step 2: ML Analysis
Our system automatically:
- Extracts behavioral features (IP sharing, phone reuse patterns)
- Builds a network graph connecting related users
- Trains a machine learning model on your specific data
- Detects communities (fraud rings) within the network
- Calculates individual risk scores
- Identifies suspicious connections
  
### Step 3: Get Results
Receive a comprehensive analysis showing:
- **Risk Dashboard** - Overview of high, medium, and low-risk users
- **Individual Scores** - Fraud probability for each user
- **Fraud Rings** - Detected coordinated groups
- **Recommendations** - Which accounts to investigate first

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
