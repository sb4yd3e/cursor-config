'use client';

import { useState } from 'react';

interface PreviewPanelProps {
  cursorrules: string;
  developmentGuide: string;
  envExample: string;
}

type Tab = 'cursorrules' | 'devguide' | 'env';

export function PreviewPanel({ cursorrules, developmentGuide, envExample }: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('cursorrules');
  const [copied, setCopied] = useState(false);

  const content = activeTab === 'cursorrules' ? cursorrules : 
                  activeTab === 'devguide' ? developmentGuide : 
                  envExample;
  const filename = activeTab === 'cursorrules' ? '.cursorrules' : 
                   activeTab === 'devguide' ? 'DEVELOPMENT_GUIDE.md' : 
                   '.env.example';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    zip.file('.cursorrules', cursorrules);
    zip.file('DEVELOPMENT_GUIDE.md', developmentGuide);
    zip.file('.env.example', envExample);
    
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cursor-config-files.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('cursorrules')}
            className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === 'cursorrules'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900'
              }
            `}
          >
            .cursorrules
          </button>
          <button
            onClick={() => setActiveTab('devguide')}
            className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === 'devguide'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900'
              }
            `}
          >
            DEVELOPMENT_GUIDE.md
          </button>
          <button
            onClick={() => setActiveTab('env')}
            className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === 'env'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-900'
              }
            `}
          >
            .env.example
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs text-gray-600 font-mono">{filename}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Download
          </button>
          <button
            onClick={handleDownloadAll}
            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>ZIP</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gray-900 overflow-auto max-h-[600px]">
        <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap break-words">
          {content || 'Fill in the form to generate your files...'}
        </pre>
      </div>
    </div>
  );
}

