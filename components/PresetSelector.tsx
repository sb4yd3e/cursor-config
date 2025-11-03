'use client';

import { useState } from 'react';
import { PRESET_CONFIGS, PresetConfig } from '@/lib/presets';
import { ProjectFormData } from '@/types';

interface PresetSelectorProps {
  onSelectPreset: (config: Partial<ProjectFormData>) => void;
}

export function PresetSelector({ onSelectPreset }: PresetSelectorProps) {
  const [showPresets, setShowPresets] = useState(false);

  const handlePresetClick = (preset: PresetConfig) => {
    onSelectPreset(preset.config);
    setShowPresets(false);
  };

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setShowPresets(!showPresets)}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>⚡ Quick Start with Presets</span>
      </button>

      {showPresets && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
          <div className="md:col-span-2 lg:col-span-3 mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Choose a preset to get started quickly:</h3>
          </div>
          
          {PRESET_CONFIGS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-start space-x-3">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {preset.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-purple-600">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {preset.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {preset.config.technologyStack?.frameworks.slice(0, 2).map((fw, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowPresets(false)}
            className="md:col-span-2 lg:col-span-3 mt-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ✕ Close Presets
          </button>
        </div>
      )}
    </div>
  );
}

