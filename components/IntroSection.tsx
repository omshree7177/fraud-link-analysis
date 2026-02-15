'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingUp, Users } from 'lucide-react';

export function IntroSection() {
  return (
    <div className="space-y-8 mb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Graph ML Detection Suite</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Detect fraud rings and identify social influencers using advanced graph neural networks. 
          Explore real-world applications of graph machine learning.
        </p>
      </div>

      {/* Two-column intro cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Fraud Detection */}
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 p-8 hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Fraud Ring Detection</h3>
              <p className="text-sm text-slate-700 mb-4">
                Identifies coordinated fraud patterns in transaction networks using Node2Vec embeddings and community detection.
              </p>
              <div className="bg-white bg-opacity-60 rounded p-3 text-xs text-slate-700 border border-red-100">
                <span className="font-semibold">Example:</span> Detects when multiple accounts 
                work together to abuse payment systems. Node2Vec learns node relationships, 
                then we find suspicious clusters.
              </div>
            </div>
          </div>
        </Card>

        {/* Social Influence */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-8 hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Social Influence Modeling</h3>
              <p className="text-sm text-slate-700 mb-4">
                Maps social networks to find influencers and predict community growth using graph embeddings.
              </p>
              <div className="bg-white bg-opacity-60 rounded p-3 text-xs text-slate-700 border border-green-100">
                <span className="font-semibold">Example:</span> Identifies key users who drive 
                engagement. Predicts which new connections will spread content fastest based on 
                existing network structure.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* How it works */}
      <Card className="bg-blue-50 border-blue-200 p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 mb-3">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
              <div>
                <div className="font-semibold text-blue-600 mb-1">1. Network Creation</div>
                <p>Generate or upload a network with nodes (entities/users) and edges (relationships/transactions)</p>
              </div>
              <div>
                <div className="font-semibold text-blue-600 mb-1">2. Graph Analysis</div>
                <p>Apply Node2Vec to learn embeddings, detect communities, and predict missing connections</p>
              </div>
              <div>
                <div className="font-semibold text-blue-600 mb-1">3. Insights</div>
                <p>View interactive visualizations, metrics, and recommended actions</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Call to action */}
      <div className="text-center">
        <p className="text-slate-600">
          Choose a detection mode below to get started →
        </p>
      </div>
    </div>
  );
}
