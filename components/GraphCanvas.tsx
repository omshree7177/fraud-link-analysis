'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  degree: number;
  community: number;
  label?: number;
  is_influencer?: boolean;
  influence_score?: number;
}

interface Edge {
  source: number;
  target: number;
}

interface GraphCanvasProps {
  nodes: Node[];
  edges: Edge[];
  width?: number;
  height?: number;
  highlightCommunities?: boolean;
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodes,
  edges,
  width = 800,
  height = 600,
  highlightCommunities = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  // Force-directed layout simulation
  const [positions, setPositions] = useState<Map<number, { x: number; y: number }> | null>(null);

  useEffect(() => {
    if (nodes.length === 0) return;

    // Initialize positions
    const newPositions = new Map<number, { x: number; y: number }>();
    nodes.forEach((node) => {
      newPositions.set(node.id, {
        x: Math.random() * width,
        y: Math.random() * height,
      });
    });

    // Force-directed simulation
    let velocities = new Map<number, { vx: number; vy: number }>();
    nodes.forEach((node) => {
      velocities.set(node.id, { vx: 0, vy: 0 });
    });

    const simulate = () => {
      const k = Math.sqrt((width * height) / nodes.length);
      const dt = 0.1;
      const damping = 0.85;

      // Apply forces
      nodes.forEach((node) => {
        let fx = 0;
        let fy = 0;

        const pos1 = newPositions.get(node.id)!;

        // Repulsive forces
        nodes.forEach((other) => {
          if (other.id === node.id) return;
          const pos2 = newPositions.get(other.id)!;
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const repulsion = (k * k) / dist;
          fx += (dx / dist) * repulsion;
          fy += (dy / dist) * repulsion;
        });

        // Attractive forces (edges)
        edges.forEach((edge) => {
          if (edge.source === node.id) {
            const pos2 = newPositions.get(edge.target)!;
            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const attraction = (dist * dist) / k;
            fx += (dx / dist) * attraction;
            fy += (dy / dist) * attraction;
          } else if (edge.target === node.id) {
            const pos2 = newPositions.get(edge.source)!;
            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const attraction = (dist * dist) / k;
            fx += (dx / dist) * attraction;
            fy += (dy / dist) * attraction;
          }
        });

        // Update velocity
        const vel = velocities.get(node.id)!;
        vel.vx = (vel.vx + fx * dt) * damping;
        vel.vy = (vel.vy + fy * dt) * damping;

        // Update position
        pos1.x += vel.vx * dt;
        pos1.y += vel.vy * dt;

        // Keep within bounds
        pos1.x = Math.max(30, Math.min(width - 30, pos1.x));
        pos1.y = Math.max(30, Math.min(height - 30, pos1.y));
      });
    };

    // Run simulation
    for (let i = 0; i < 100; i++) {
      simulate();
    }

    setPositions(newPositions);
  }, [nodes, edges, width, height]);

  // Draw canvas
  useEffect(() => {
    if (!canvasRef.current || !positions) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw edges
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    edges.forEach((edge) => {
      const pos1 = positions.get(edge.source);
      const pos2 = positions.get(edge.target);
      if (pos1 && pos2) {
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    const communityColors: { [key: number]: string } = {};
    const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#14b8a6', '#f59e0b', '#ef4444'];

    nodes.forEach((node) => {
      const pos = positions.get(node.id);
      if (!pos) return;

      // Assign community color
      if (!communityColors[node.community]) {
        communityColors[node.community] = colors[Object.keys(communityColors).length % colors.length];
      }

      const color = highlightCommunities ? communityColors[node.community] : '#3b82f6';
      const size = Math.sqrt(node.degree) * 3 + 4;

      // Draw node
      ctx.fillStyle = selectedNode === node.id ? '#fbbf24' : color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.fill();

      // Node border
      ctx.strokeStyle = selectedNode === node.id ? '#fbbf24' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [positions, nodes, edges, width, height, highlightCommunities, selectedNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!positions || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked node
    for (const node of nodes) {
      const pos = positions.get(node.id);
      if (!pos) continue;
      const size = Math.sqrt(node.degree) * 3 + 4;
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (dist < size + 5) {
        setSelectedNode(node.id);
        return;
      }
    }
    setSelectedNode(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleCanvasClick}
      className="border border-slate-700 rounded-lg cursor-pointer bg-slate-950"
    />
  );
};

export default GraphCanvas;
