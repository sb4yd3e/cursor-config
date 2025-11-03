'use client';

import { Domain } from '@/types';

interface DomainOption {
  id: Domain;
  label: string;
  description: string;
  icon: string;
}

const domainOptions: DomainOption[] = [
  {
    id: 'general',
    label: 'General Purpose',
    description: 'Suitable for any type of project',
    icon: '⚙️',
  },
  {
    id: 'web-frontend',
    label: 'Web Frontend',
    description: 'React, Vue, Angular applications',
    icon: '🎨',
  },
  {
    id: 'web-backend',
    label: 'Web Backend',
    description: 'APIs and server-side applications',
    icon: '🔧',
  },
  {
    id: 'web-fullstack',
    label: 'Web Full-Stack',
    description: 'Complete web applications',
    icon: '🌐',
  },
  {
    id: 'mobile-ios',
    label: 'Mobile iOS',
    description: 'iOS applications with Swift',
    icon: '📱',
  },
  {
    id: 'mobile-android',
    label: 'Mobile Android',
    description: 'Android applications with Kotlin',
    icon: '🤖',
  },
  {
    id: 'mobile-react-native',
    label: 'React Native',
    description: 'Cross-platform mobile apps',
    icon: '📲',
  },
  {
    id: 'data-science',
    label: 'Data Science',
    description: 'ML, data analysis, and AI projects',
    icon: '📊',
  },
  {
    id: 'devops',
    label: 'DevOps',
    description: 'Infrastructure and automation',
    icon: '🚀',
  },
];

interface DomainSelectorProps {
  value: Domain;
  onChange: (domain: Domain) => void;
}

export function DomainSelector({ value, onChange }: DomainSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Project Domain
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {domainOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`
              p-4 rounded-lg border-2 text-left transition-all
              ${
                value === option.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {option.label}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

