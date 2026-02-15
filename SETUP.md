# Graph ML Suite - Setup & Getting Started

## Quick Start (5 Minutes)

### 1. Install Python Dependencies
```bash
# Check Python version (need 3.8+)
python3 --version

# Install required packages
pip install networkx numpy

# Or use requirements.txt
pip install -r requirements.txt
```

### 2. Install Node Dependencies
```bash
# Using npm
npm install

# Or using pnpm (recommended)
pnpm install

# Or using yarn
yarn install
```

### 3. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

### 4. Open in Browser
Visit `http://localhost:3000` and start exploring!

---

## Using the Dashboard

### Fraud Ring Detection

1. **Start Analysis**
   - Click "Fraud Ring Detection" tab
   - Choose network size (30/50/100 nodes)
   - Click "Run Analysis"

2. **Interpret Results**
   - **Graph Display**: Each node is an entity, edges are transactions
   - **Colors**: Different colors = different fraud rings (communities)
   - **Node Size**: Larger = more connections (higher involvement)
   - **Highlighted Node**: Yellow = selected for inspection

3. **Read Insights**
   - **Metrics Panel**: Network statistics
     - Total Nodes/Edges: Network size
     - Avg Degree: Average connections per entity
     - Density: How interconnected (0-1)
     - Communities: Number of fraud rings detected
   - **Suspicious Links**: Predicted hidden connections (high confidence = likely coordinated)

4. **Toggle Community View**
   - Check "Highlight communities by color" to see fraud rings clearly
   - Uncheck to see node degree-based coloring

---

### Social Influence Modeling

1. **Start Analysis**
   - Click "Social Influence" tab
   - Choose network size (40/60/100 nodes)
   - Click "Run Analysis"

2. **Interpret Results**
   - **Graph Display**: Users in network, edges are follow relationships
   - **Colors**: Different communities (groups of connected users)
   - **Node Size**: More connections = more popular
   - **Highlighted Node**: Selected user for inspection

3. **Read Insights**
   - **Metrics Panel**: Network statistics
     - Total Nodes/Edges: User count and follow relationships
     - Avg Degree: Average followers
     - Density: Network connectivity
     - Communities: User groups or communities
     - Influencers: High-influence user count
     - Avg Influence: Average influence score
   - **Growth Opportunities**: Recommended new connections that would grow influence

4. **Understanding Predictions**
   - Each connection shows predicted strength (0-100%)
   - Higher % = more valuable connection
   - Sorted by prediction confidence

---

## Understanding the Algorithms

### Node2Vec Embeddings
**What it does**: Creates a numerical representation (32 dimensions) of each node based on its neighborhood

**How it works**:
1. Takes random walks from each node
2. Learns which nodes appear together in walks
3. Creates embeddings that preserve network structure

**Why it matters**: Nodes in similar structural positions get similar embeddings, enabling:
- Link prediction (similarity → likely connection)
- Classification (input to ML models)
- Visualization (dimensionality reduction)

**Interview Angle**: "Node2Vec captures both proximity and structural similarity. A fraudster connected to a fraud ring has different embeddings than a legitimate user with the same number of connections."

### Community Detection
**What it does**: Automatically groups nodes into communities (fraud rings or user groups)

**How it works**:
1. Assigns each node to a community (initially each node is own community)
2. Iteratively moves nodes to communities with more neighbors
3. Stops when no improvements possible

**Why it matters**:
- Fraud: Groups coordinated fraudsters
- Social: Identifies user communities
- Efficiency: Faster than checking all pairs

**Interview Angle**: "Modularity optimization finds the best grouping by maximizing internal connections and minimizing external connections. Fraud rings are high-modularity subgraphs."

### Link Prediction
**What it does**: Scores potential connections that don't yet exist

**How it works**:
1. Uses embedding vectors from Node2Vec
2. Calculates similarity (cosine) between all node pairs
3. Returns top-K highest similarity scores

**Why it matters**:
- Fraud: Predicts hidden coordination
- Social: Suggests growth connections
- Privacy: Works with embeddings, not raw data

**Interview Angle**: "Embedding-based link prediction has O(n²) complexity but captures semantic relationships. For fraud, high-scoring predictions indicate probable coordination."

---

## Customization & Extension

### Change Network Sizes
Edit `app/page.tsx` line ~60:
```typescript
const [fraudNodes, setFraudNodes] = useState(50);  // Change here
```

### Adjust Algorithm Parameters
Edit `scripts/ml_backend.py`:
```python
# Node2Vec parameters
n2v = Node2Vec(G, 
    embedding_dim=64,      # Increase for more detail
    walks_per_node=10,     # More walks = better quality
    walk_length=80,        # Longer walks = larger context
    p=1.0, q=1.0          # BFS vs DFS trade-off
)
```

### Add More Use Cases
Create new functions in `ml_backend.py`:
```python
def analyze_recommendation_network():
    """Example: Product recommendation networks"""
    pass
```

And add new API routes in `app/api/`:
```typescript
// app/api/analyze-recommendations/route.ts
```

### Improve Visualizations
The `GraphCanvas.tsx` component can be enhanced:
- Add 3D rendering (Three.js)
- Animate random walks
- Add edge labels with interaction types
- Real-time network updates

---

## Troubleshooting

### Error: "Python not found"
```bash
# Check if Python3 is installed
python3 --version

# May need to use 'python' instead on some systems
```

### Error: "Module not found: networkx"
```bash
# Install dependencies
pip install networkx numpy

# Or install from requirements
pip install -r requirements.txt
```

### Error: "Address already in use"
Port 3000 is taken. Either:
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Slow Performance on Large Networks
- Reduce network size (start with 50 nodes)
- Reduce walk_per_node or walk_length in Python backend
- Check browser console for errors

### Graph Not Displaying
- Open browser console (F12)
- Check for JavaScript errors
- Try different network size
- Clear browser cache (Ctrl+Shift+Delete)

---

## Performance Tips

### For Better Visualizations
- Use 50-100 nodes (sweet spot)
- Enable community highlighting
- Use 1-2 second analysis time
- Fullscreen for better graph view

### For Better Analysis
- Small networks (30) for quick exploration
- Medium networks (60) for detailed analysis
- Large networks (100) for comprehensive patterns

### For Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (one-click)
# Visit vercel.com/new and import this repo

# Or deploy elsewhere
npm run start  # Run production server
```

---

## Interview Preparation

### Questions You'll Get Asked

**Q: How would you handle graphs with millions of nodes?**
A: Node2Vec doesn't scale. For production, I'd use:
- GraphSAGE for sampling-based training
- PyTorch Geometric for GPU acceleration
- Distributed systems (DGL on Spark)

**Q: How would you explain this to a non-technical stakeholder?**
A: "We find fraud rings by looking at who transacts with whom. Users in fraud rings communicate similarly. We use a technique called Node2Vec to understand this structure and predict hidden relationships."

**Q: What are limitations of your approach?**
A: 
- Assumes fraud shows in transaction patterns
- Doesn't handle temporal aspects
- Greedy community detection may miss optimal clusters
- Limited to 100s of nodes without optimization

**Q: How would you improve this?**
A: 
- Add temporal dimension (when did they transact?)
- Use GNNs with attention mechanisms
- Incorporate node features (age, location, etc.)
- Implement streaming algorithms for live updates

**Q: What about privacy/security?**
A: 
- Embeddings can be pseudonymized
- Don't expose raw network data
- Use differential privacy for aggregation
- Audit predictions for bias

---

## Next Steps

1. **Explore the Algorithms**
   - Run fraud detection with different sizes
   - Notice how community structure emerges
   - Try with community highlighting on/off

2. **Read the Code**
   - `ml_backend.py` - All algorithms
   - `app/page.tsx` - Dashboard UI
   - `GraphCanvas.tsx` - Visualization

3. **Customize for Portfolio**
   - Add your own use case
   - Improve visualization quality
   - Document your enhancements
   - Deploy to Vercel

4. **Prepare Interview Stories**
   - Why Graph ML? (rare skill, interesting patterns)
   - What was challenging? (implementing Node2Vec, visualization)
   - How would you scale? (sampling, distributed systems)
   - What did you learn? (trade-offs, limitations)

---

## Resources

- [NetworkX Documentation](https://networkx.org/documentation/)
- [Node2Vec Paper](https://arxiv.org/pdf/1607.00653.pdf)
- [Stanford CS224W: Machine Learning with Graphs](https://web.stanford.edu/class/cs224w/)
- [Graph Embeddings Survey](https://arxiv.org/abs/1709.07604)

---

**Happy exploring! This project is ready for interviews. Show it off with confidence!**
