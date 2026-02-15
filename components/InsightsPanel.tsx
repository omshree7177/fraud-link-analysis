'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface PredictedLink {
  source: number;
  target: number;
  score: number;
}

interface InsightsPanelProps {
  suspicious_links?: PredictedLink[];
  potential_connections?: PredictedLink[];
  title?: string;
  type?: 'fraud' | 'social';
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({
  suspicious_links,
  potential_connections,
  title = 'Predictions & Insights',
  type = 'fraud',
}) => {
  const links = suspicious_links || potential_connections || [];
  const displayTitle = type === 'fraud' ? 'Suspicious Links' : 'Potential Connections';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
        {type === 'fraud' ? <AlertCircle className="w-5 h-5 text-red-600" /> : <TrendingUp className="w-5 h-5 text-green-600" />}
        {title}
      </h3>

      <Card className={`${type === 'fraud' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border p-4 shadow-sm`}>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {links.length === 0 ? (
            <p className="text-slate-500 text-sm">No predictions available</p>
          ) : (
            links.slice(0, 10).map((link, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded border hover:shadow-md transition-all ${
                  type === 'fraud'
                    ? 'bg-white border-red-100 hover:border-red-200'
                    : 'bg-white border-green-100 hover:border-green-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="text-sm font-mono text-slate-700 font-medium">
                    {link.source} → {link.target}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${type === 'fraud' ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(link.score * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold w-12 text-right ${type === 'fraud' ? 'text-red-700' : 'text-green-700'}`}>
                    {(link.score * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default InsightsPanel;
