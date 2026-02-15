'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Loader2, Download, Eye } from 'lucide-react';
import UploadSection from '@/components/UploadSection';
import ResultsDashboard from '@/components/ResultsDashboard';

interface AnalysisState {
  status: 'idle' | 'uploading' | 'training' | 'complete' | 'error';
  progress: number;
  riskScores?: any[];
  fraudRings?: any[];
  metrics?: any;
  error?: string;
  fileName?: string;
}

export default function Dashboard() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({ status: 'idle', progress: 0 });
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = async (file: File) => {
    setAnalysisState({ status: 'uploading', progress: 20, fileName: file.name });

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Upload to server
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisState(prev => ({ ...prev, progress: 40, status: 'training' }));

      // Call the training API
      const response = await fetch('/api/train', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Training failed');
      const results = await response.json();

      // Simulate final processing
      await new Promise(resolve => setTimeout(resolve, 500));

      setAnalysisState({
        status: 'complete',
        progress: 100,
        riskScores: results.riskScores,
        fraudRings: results.fraudRings,
        metrics: results.metrics,
        fileName: file.name,
      });
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      setAnalysisState({
        status: 'error',
        progress: 0,
        error: 'Failed to process file. Please try again.',
      });
    }
  };

  const generateMockResults = () => {
    return {
      riskScores: [
        { name: 'Example User 1', email: 'user1@example.com', ip: '192.168.1.1', phone: '555-0101', riskScore: 85, reason: 'Shared IP with multiple accounts' },
        { name: 'Example User 2', email: 'user2@example.com', ip: '192.168.1.2', phone: '555-0102', riskScore: 72, reason: 'High-risk phone number pattern' },
        { name: 'Example User 3', email: 'user3@example.com', ip: '192.168.1.3', phone: '555-0103', riskScore: 45, reason: 'Associated with flagged accounts' },
      ],
      fraudRings: [
        { id: 1, members: ['User1', 'User2'], size: 2, confidence: 0.94, description: 'Shared IP addresses detected' },
      ],
      metrics: {
        totalUsers: 10,
        highRiskCount: 2,
        mediumRiskCount: 3,
        lowRiskCount: 5,
        fraudRingsDetected: 1,
        avgRiskScore: 42.5,
        modelAccuracy: 0.89,
      },
    };
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-700 hover:bg-white/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FraudDetect Dashboard
            </h1>
          </div>
        </div>

        {/* Main Content */}
        {!showResults ? (
          <div className="space-y-8">
            {/* Analysis Progress */}
            {analysisState.status !== 'idle' && (
              <Card className="bg-white/40 backdrop-blur-sm border border-purple-200 p-8 shadow-lg">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {analysisState.status === 'uploading' && 'Uploading your data...'}
                    {analysisState.status === 'training' && 'Training ML Model...'}
                    {analysisState.status === 'complete' && 'Analysis Complete!'}
                    {analysisState.status === 'error' && 'Error Processing File'}
                  </h2>
                  <p className="text-slate-700">{analysisState.fileName}</p>

                  {analysisState.status === 'error' ? (
                    <div className="bg-red-100 border border-red-300 rounded p-4">
                      <p className="text-red-800">{analysisState.error}</p>
                    </div>
                  ) : (
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-500"
                        style={{ width: `${analysisState.progress}%` }}
                      />
                    </div>
                  )}

                  {analysisState.status !== 'error' && (
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {analysisState.progress}%
                    </div>
                  )}

                  {analysisState.status === 'complete' && (
                    <Button
                      onClick={() => setShowResults(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white mt-4"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  )}

                  {analysisState.status === 'error' && (
                    <Button
                      onClick={() => setAnalysisState({ status: 'idle', progress: 0 })}
                      className="bg-purple-600 hover:bg-purple-700 text-white mt-4"
                    >
                      Try Again
                    </Button>
                  )}
                </div>
              </Card>
            )}

            {/* Upload Section */}
            {(analysisState.status === 'idle' || analysisState.status === 'error') && (
              <UploadSection onFileUpload={handleFileUpload} />
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800">Analysis Results</h2>
              <div className="flex gap-4">
                <Button variant="outline" className="border-purple-300 text-slate-700 bg-white/50">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setAnalysisState({ status: 'idle', progress: 0 });
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  New Analysis
                </Button>
              </div>
            </div>

            {/* Results Dashboard */}
            {analysisState.riskScores && analysisState.fraudRings && analysisState.metrics && (
              <ResultsDashboard
                riskScores={analysisState.riskScores}
                fraudRings={analysisState.fraudRings}
                metrics={analysisState.metrics}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
