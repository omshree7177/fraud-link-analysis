'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileCheck } from 'lucide-react';

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
}

export default function UploadSection({ onFileUpload }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      setSelectedFile(file);
    } else {
      alert('Please upload a CSV file');
    }
  };

  return (
    <div className="space-y-8">
      {/* Instructions */}
      <Card className="bg-white/40 backdrop-blur-sm border border-purple-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">How to Prepare Your Data</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center text-lg font-bold">1</div>
            <h3 className="font-bold text-slate-800">Create CSV File</h3>
            <p className="text-slate-700 text-sm">Prepare a CSV with columns: name, email, ip_address, phone_number, and any other identifiers.</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white flex items-center justify-center text-lg font-bold">2</div>
            <h3 className="font-bold text-slate-800">Example Format</h3>
            <p className="text-slate-700 text-sm">
              <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                name, email, ip_address, phone
              </code>
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white flex items-center justify-center text-lg font-bold">3</div>
            <h3 className="font-bold text-slate-800">Upload & Analyze</h3>
            <p className="text-slate-700 text-sm">Upload your file and our ML model will train on your specific data patterns.</p>
          </div>
        </div>
      </Card>

      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed p-12 rounded-2xl transition-all cursor-pointer ${
          dragActive
            ? 'border-purple-600 bg-purple-100/40'
            : 'border-purple-300 bg-white/40 backdrop-blur-sm hover:bg-purple-50/40'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <div className="text-center">
            {selectedFile ? (
              <>
                <FileCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-bold text-slate-800 mb-2">{selectedFile.name}</p>
                <p className="text-slate-600 mb-4">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </>
            ) : (
              <>
                <Upload className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <p className="text-xl font-bold text-slate-800 mb-2">
                  Drop your CSV here or click to select
                </p>
                <p className="text-slate-600">
                  Supported format: CSV (max 50MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </Card>

      {/* Submit Button */}
      {selectedFile && (
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="border-purple-300 text-slate-700 bg-white/50"
            onClick={() => setSelectedFile(null)}
          >
            Clear Selection
          </Button>
          <Button
            onClick={() => onFileUpload(selectedFile)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
          >
            <Upload className="w-4 h-4 mr-2" />
            Start Analysis
          </Button>
        </div>
      )}

      {/* Example Note */}
      <Card className="bg-blue-50 border border-blue-200 p-6 shadow-sm">
        <h3 className="font-bold text-blue-900 mb-2">Example CSV Format</h3>
        <code className="text-xs bg-white p-3 block rounded border border-blue-200 text-slate-800">
          name,email,ip_address,phone_number{'\n'}
          John Doe,john@example.com,192.168.1.1,555-0101{'\n'}
          Jane Smith,jane@example.com,192.168.1.2,555-0102{'\n'}
          Bob Wilson,bob@example.com,192.168.1.1,555-0103
        </code>
        <p className="text-sm text-blue-900 mt-3">
          The more data you provide (10+ rows), the more accurate the fraud detection will be.
        </p>
      </Card>
    </div>
  );
}
