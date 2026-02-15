'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Users, TrendingUp, BarChart3 } from 'lucide-react';

interface RiskScore {
  name: string;
  email: string;
  ip: string;
  phone: string;
  riskScore: number;
  reason: string;
}

interface FraudRing {
  id: number;
  members: string[];
  size: number;
  confidence: number;
  description: string;
}

interface Metrics {
  totalUsers: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  fraudRingsDetected: number;
  avgRiskScore: number;
  modelAccuracy: number;
}

interface ResultsDashboardProps {
  riskScores: RiskScore[];
  fraudRings: FraudRing[];
  metrics: Metrics;
}

export default function ResultsDashboard({
  riskScores,
  fraudRings,
  metrics,
}: ResultsDashboardProps) {
  const [sortBy, setSortBy] = useState<'risk' | 'name'>('risk');

  const sortedScores = [...riskScores].sort((a, b) => {
    if (sortBy === 'risk') return b.riskScore - a.riskScore;
    return a.name.localeCompare(b.name);
  });

  const getRiskColor = (score: number) => {
    if (score >= 70) return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', badge: 'bg-red-100' };
    if (score >= 40) return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-900', badge: 'bg-yellow-100' };
    return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-900', badge: 'bg-green-100' };
  };

  return (
    <Tabs defaultValue="overview" className="w-full space-y-6">
      <TabsList className="bg-white/40 border border-purple-200 grid w-full grid-cols-4 shadow-sm rounded-lg">
        <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          <BarChart3 className="w-4 h-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="risk-scores" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Risk Scores
        </TabsTrigger>
        <TabsTrigger value="fraud-rings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          <Users className="w-4 h-4 mr-2" />
          Fraud Rings
        </TabsTrigger>
        <TabsTrigger value="insights" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
          <TrendingUp className="w-4 h-4 mr-2" />
          Insights
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-medium mb-2">Total Users</p>
            <p className="text-3xl font-bold text-blue-900">{metrics.totalUsers}</p>
          </Card>
          <Card className="bg-gradient-to-br from-red-100 to-red-50 border border-red-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-medium mb-2">High Risk</p>
            <p className="text-3xl font-bold text-red-900">{metrics.highRiskCount}</p>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-medium mb-2">Medium Risk</p>
            <p className="text-3xl font-bold text-yellow-900">{metrics.mediumRiskCount}</p>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-green-50 border border-green-200 p-6 shadow-sm">
            <p className="text-sm text-slate-600 font-medium mb-2">Model Accuracy</p>
            <p className="text-3xl font-bold text-green-900">{(metrics.modelAccuracy * 100).toFixed(0)}%</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/40 backdrop-blur-sm border border-purple-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Risk Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">High Risk (70+)</span>
                  <span className="text-sm font-bold text-red-900">{metrics.highRiskCount}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(metrics.highRiskCount / metrics.totalUsers) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Medium Risk (40-69)</span>
                  <span className="text-sm font-bold text-yellow-900">{metrics.mediumRiskCount}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(metrics.mediumRiskCount / metrics.totalUsers) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Low Risk (&lt;40)</span>
                  <span className="text-sm font-bold text-green-900">{metrics.lowRiskCount}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(metrics.lowRiskCount / metrics.totalUsers) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border border-purple-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Key Findings</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-2xl text-purple-600">🎯</span>
                <span className="text-slate-700">
                  <strong>{metrics.fraudRingsDetected}</strong> potential fraud rings detected with high confidence
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-2xl text-red-600">⚠️</span>
                <span className="text-slate-700">
                  <strong>{metrics.highRiskCount}</strong> users flagged as high-risk requiring immediate investigation
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-2xl text-blue-600">📊</span>
                <span className="text-slate-700">
                  Average risk score: <strong>{metrics.avgRiskScore.toFixed(1)}/100</strong>
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </TabsContent>

      {/* Risk Scores Tab */}
      <TabsContent value="risk-scores" className="space-y-4">
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => setSortBy('risk')}
            className={`px-4 py-2 rounded font-medium transition-all ${
              sortBy === 'risk'
                ? 'bg-purple-600 text-white'
                : 'bg-white/40 border border-purple-200 text-slate-700 hover:bg-purple-50/40'
            }`}
          >
            Sort by Risk
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-4 py-2 rounded font-medium transition-all ${
              sortBy === 'name'
                ? 'bg-purple-600 text-white'
                : 'bg-white/40 border border-purple-200 text-slate-700 hover:bg-purple-50/40'
            }`}
          >
            Sort by Name
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedScores.map((score, idx) => {
            const colors = getRiskColor(score.riskScore);
            return (
              <Card key={idx} className={`${colors.bg} border ${colors.border} p-4 shadow-sm`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`font-bold ${colors.text}`}>{score.name}</h4>
                      <span className={`${colors.badge} ${colors.text} text-xs font-bold px-2 py-1 rounded`}>
                        {score.riskScore}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p>Email: {score.email}</p>
                      <p>IP: {score.ip}</p>
                      <p>Phone: {score.phone}</p>
                      <p className={`mt-2 font-medium ${colors.text}`}>{score.reason}</p>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${colors.text}`}>{score.riskScore}</div>
                      <div className="text-xs text-slate-600">risk</div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </TabsContent>

      {/* Fraud Rings Tab */}
      <TabsContent value="fraud-rings" className="space-y-4">
        <div className="space-y-4">
          {fraudRings.map((ring, idx) => (
            <Card key={idx} className="bg-white/40 backdrop-blur-sm border border-red-300 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Fraud Ring #{ring.id}</h3>
                  <p className="text-slate-700 text-sm">{ring.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{ring.size}</div>
                  <div className="text-xs text-slate-600">members</div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-slate-600 mb-2">Members:</p>
                <div className="flex flex-wrap gap-2">
                  {ring.members.map((member, midx) => (
                    <span
                      key={midx}
                      className="bg-red-100 text-red-900 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Confidence Level</span>
                  <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: `${ring.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-red-600">{(ring.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Insights Tab */}
      <TabsContent value="insights" className="space-y-4">
        <Card className="bg-white/40 backdrop-blur-sm border border-purple-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recommendations</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="font-bold text-slate-800">Immediate Actions</p>
                <p className="text-slate-700 text-sm">Block or require additional verification for all high-risk users (70+ score)</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-bold text-slate-800">Investigation Required</p>
                <p className="text-slate-700 text-sm">Review the {fraudRings.length} detected fraud rings manually to confirm patterns</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <p className="font-bold text-slate-800">Pattern Insight</p>
                <p className="text-slate-700 text-sm">Multiple users sharing the same IP address is the strongest fraud signal - implement IP-based rate limiting</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="font-bold text-slate-800">Monitoring</p>
                <p className="text-slate-700 text-sm">Re-run this analysis monthly to track how fraud patterns evolve and model accuracy improves</p>
              </div>
            </li>
          </ul>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
