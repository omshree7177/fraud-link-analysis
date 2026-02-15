'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, BarChart3, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/30 backdrop-blur-md sticky top-0 z-50 border-b border-purple-200/50">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Fraud Link Analysis
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
          Fraud Link Analysis
        </h1>
        <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
          Upload your user data. We train custom ML models on your dataset. Detect fraud rings, identify risky patterns, and protect your business with actionable AI insights.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Start Your Analysis
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white/40 backdrop-blur-sm py-16 my-12 rounded-3xl mx-8 border border-purple-200/50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Why ML-Based Fraud Detection?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-red-100 to-red-50 border border-red-200 p-6 shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Billions in Losses</h3>
              <p className="text-slate-700">Fraud rings cost enterprises billions annually through coordinated schemes that traditional systems miss.</p>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 p-6 shadow-sm">
              <div className="text-4xl mb-4">🕸️</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Hidden Networks</h3>
              <p className="text-slate-700">Fraudsters share IPs, phones, and accounts across multiple identities. Graph ML reveals these invisible connections.</p>
            </Card>
            <Card className="bg-gradient-to-br from-green-100 to-green-50 border border-green-200 p-6 shadow-sm">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">ML Finds Patterns</h3>
              <p className="text-slate-700">Your team can't manually review thousands of users. Machine learning trains on your data to find what matters.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">1</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Upload CSV Data</h3>
              <p className="text-slate-700">Upload user data with names, IP addresses, phone numbers, and any other identifiers.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">2</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Train ML Model</h3>
              <p className="text-slate-700">Our system trains a custom model on YOUR data using graph embeddings and anomaly detection.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">3</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Get Risk Scores</h3>
              <p className="text-slate-700">Each person gets a fraud risk score (0-100) with explanations of why they're flagged.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">4</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Detect Fraud Rings</h3>
              <p className="text-slate-700">Identify groups of coordinated fraudsters using community detection algorithms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-white/40 backdrop-blur-sm py-16 my-12 rounded-3xl mx-8 border border-purple-200/50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Risk Scores for Every User</h3>
                <p className="text-slate-700 text-sm">Fraud probability scores with feature importance explanations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Fraud Ring Detection</h3>
                <p className="text-slate-700 text-sm">Identify coordinated groups using graph neural networks</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Interactive Dashboard</h3>
                <p className="text-slate-700 text-sm">Visualize networks, explore connections, export reports</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Real-time API</h3>
                <p className="text-slate-700 text-sm">Score new users instantly as they sign up</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Historical Tracking</h3>
                <p className="text-slate-700 text-sm">Monitor how fraud patterns evolve over time</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1">PDF Reports</h3>
                <p className="text-slate-700 text-sm">Download detailed analysis reports and recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Powered By Advanced ML</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 p-6 text-center shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">Node2Vec</h3>
            <p className="text-sm text-slate-700">Graph embeddings that learn network structure</p>
          </Card>
          <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200 p-6 text-center shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">GNN</h3>
            <p className="text-sm text-slate-700">Graph neural networks for pattern detection</p>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 p-6 text-center shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">Anomaly Detection</h3>
            <p className="text-sm text-slate-700">Isolation Forest finds unusual patterns</p>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-100 to-cyan-50 border border-cyan-200 p-6 text-center shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">Community Detection</h3>
            <p className="text-sm text-slate-700">Find fraud rings & coordinated groups</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <Card className="bg-gradient-to-r from-purple-200 to-pink-200 border border-purple-300 p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Ready to Catch Fraud Rings?</h2>
          <p className="text-lg text-slate-700 mb-8 text-center">
            Your data is secure. Upload, analyze, and get actionable insights in minutes.
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Launch Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-white/20 backdrop-blur-sm mt-20 py-8 border-t border-purple-200/50">
        <div className="max-w-6xl mx-auto px-8 text-center text-slate-700">
          <p className="font-semibold mb-2">Fraud Link Analysis</p>
          <p className="text-sm">Powered by Graph Machine Learning | Your data is secure and deleted after analysis</p>
        </div>
      </footer>
    </main>
  );
}
