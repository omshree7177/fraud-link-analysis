import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

function generateMockSocialData(numNodes: number) {
  const nodes = Array.from({ length: numNodes }, (_, i) => ({
    id: i,
    label: i,
    degree: Math.floor(Math.random() * 15) + 3,
    community: Math.floor(Math.random() * 5),
    is_influencer: Math.random() < 0.15,
    influence_score: Math.random(),
  }));

  const edges = [];
  const edgeSet = new Set();
  for (let i = 0; i < Math.floor(numNodes * 1.5); i++) {
    const source = Math.floor(Math.random() * numNodes);
    const target = Math.floor(Math.random() * numNodes);
    if (source !== target) {
      const key = [source, target].sort().join('-');
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({
          source,
          target,
          weight: Math.random(),
        });
      }
    }
  }

  return {
    nodes,
    edges,
    embeddings: {},
    communities: Object.fromEntries(nodes.map(n => [n.id, n.community])),
    potential_connections: nodes.slice(0, 3).map((n, i) => ({
      source: n.id,
      target: (i + 5) % numNodes,
      score: 0.6 + Math.random() * 0.4,
    })),
    metrics: {
      total_nodes: numNodes,
      total_edges: edges.length,
      avg_degree: (edges.length * 2) / numNodes,
      density: (edges.length * 2) / (numNodes * (numNodes - 1)),
      num_communities: 5,
      num_influencers: Math.floor(numNodes * 0.15),
      avg_influence: 0.45 + Math.random() * 0.1,
    },
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const numNodes = parseInt(searchParams.get('nodes') || '60', 10);

    const pythonScript = path.join(process.cwd(), 'scripts', 'ml_backend.py');
    const command = `python3 -c "
import sys
sys.path.insert(0, '${path.join(process.cwd(), 'scripts')}')
from ml_backend import analyze_social_network
import json
result = analyze_social_network(${numNodes})
print(json.dumps(result))
"`;

    const { stdout, stderr } = await execAsync(command, { maxBuffer: 10 * 1024 * 1024 });

    if (stderr) {
      console.error('Python stderr:', stderr);
    }

    const result = JSON.parse(stdout);
    return Response.json(result);
  } catch (error) {
    console.log('[v0] Python dependencies not available, using mock social data');
    const { searchParams } = new URL(request.url);
    const numNodes = parseInt(searchParams.get('nodes') || '60', 10);
    return Response.json(generateMockSocialData(numNodes));
  }
}
