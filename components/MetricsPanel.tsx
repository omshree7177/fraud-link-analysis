'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface Metrics {
  total_nodes: number;
  total_edges: number;
  avg_degree: number;
  density: number;
  num_communities: number;
  num_influencers?: number;
  avg_influence?: number;
}

interface MetricsPanelProps {
  metrics: Metrics;
  title?: string;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, title = 'Network Metrics' }) => {
  if (!metrics) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <Card className="bg-white border border-slate-200 p-4">
          <div className="text-sm text-slate-500">Loading metrics...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600 font-medium">Total Nodes</div>
          <div className="text-2xl font-bold text-blue-700">{metrics.total_nodes}</div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600 font-medium">Total Edges</div>
          <div className="text-2xl font-bold text-green-700">{metrics.total_edges}</div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600 font-medium">Avg Degree</div>
          <div className="text-2xl font-bold text-purple-700">{metrics.avg_degree.toFixed(2)}</div>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600 font-medium">Density</div>
          <div className="text-2xl font-bold text-pink-700">{metrics.density.toFixed(3)}</div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600 font-medium">Communities</div>
          <div className="text-2xl font-bold text-amber-700">{metrics.num_communities}</div>
        </Card>

        {metrics.num_influencers !== undefined && (
          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 p-4 shadow-sm">
            <div className="text-sm text-slate-600 font-medium">Influencers</div>
            <div className="text-2xl font-bold text-cyan-700">{metrics.num_influencers}</div>
          </Card>
        )}

        {metrics.avg_influence !== undefined && (
          <Card className="bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 p-4 shadow-sm">
            <div className="text-sm text-slate-600 font-medium">Avg Influence</div>
            <div className="text-2xl font-bold text-violet-700">{metrics.avg_influence.toFixed(3)}</div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MetricsPanel;
