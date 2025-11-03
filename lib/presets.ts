import { Domain, ProjectFormData } from '@/types';

export interface PresetConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  domain: Domain;
  config: Partial<ProjectFormData>;
}

export const PRESET_CONFIGS: PresetConfig[] = [
  {
    id: 'nextjs-fullstack',
    name: 'Next.js Full-Stack',
    description: 'Modern full-stack app with Next.js, TypeScript, and PostgreSQL',
    icon: '⚡',
    domain: 'web-fullstack',
    config: {
      domain: 'web-fullstack',
      technologyStack: {
        languages: ['TypeScript'],
        frameworks: ['Next.js', 'React'],
        databases: ['PostgreSQL'],
        tools: ['Docker', 'Git', 'GitHub Actions', 'Vercel'],
        cssFramework: 'Tailwind CSS',
      },
      useTypeScript: true,
      useLinter: true,
      useFormatter: true,
      requireUnitTests: true,
      requireIntegrationTests: true,
      requireE2ETests: false,
      testingFrameworks: ['jest'],
      minTestCoverage: 80,
      includeApiDocs: true,
      useCICD: true,
      cicdTool: 'GitHub Actions',
      projectConfig: {
        serverPort: 3000,
        databaseConfig: {
          host: 'localhost',
          port: 5432,
          name: '',
        },
        redisConfig: {
          enabled: true,
          host: 'localhost',
          port: 6379,
        },
        apiConfig: {
          baseUrl: '/api/v1',
          version: 'v1',
          requiresAuth: true,
        },
      },
    },
  },
  {
    id: 'bun-hono-api',
    name: 'Bun + Hono API',
    description: 'Lightning-fast API with Bun runtime and Hono framework',
    icon: '🍞',
    domain: 'web-backend',
    config: {
      domain: 'web-backend',
      technologyStack: {
        languages: ['TypeScript'],
        frameworks: ['Bun + Hono'],
        databases: ['PostgreSQL'],
        tools: ['Docker', 'Git'],
      },
      useTypeScript: true,
      useLinter: true,
      useFormatter: true,
      requireUnitTests: true,
      testingFrameworks: ['jest'],
      includeApiDocs: true,
      useCICD: true,
      projectConfig: {
        serverPort: 3001,
        databaseConfig: {
          host: 'localhost',
          port: 5432,
          name: '',
        },
        redisConfig: {
          enabled: true,
          host: 'localhost',
          port: 6379,
        },
        apiConfig: {
          baseUrl: '/api/v1',
          version: 'v1',
          requiresAuth: true,
        },
      },
    },
  },
  {
    id: 'react-spa',
    name: 'React SPA',
    description: 'Single Page Application with React and Vite',
    icon: '⚛️',
    domain: 'web-frontend',
    config: {
      domain: 'web-frontend',
      technologyStack: {
        languages: ['TypeScript'],
        frameworks: ['React'],
        databases: [],
        tools: ['Git', 'Vite', 'GitHub Actions'],
        cssFramework: 'Tailwind CSS',
      },
      useTypeScript: true,
      useLinter: true,
      useFormatter: true,
      requireUnitTests: true,
      testingFrameworks: ['vitest'],
      useCICD: true,
      projectConfig: {
        serverPort: 5173,
      },
    },
  },
  {
    id: 'flutter-mobile',
    name: 'Flutter App',
    description: 'Cross-platform mobile app with Flutter',
    icon: '📱',
    domain: 'mobile-react-native',
    config: {
      domain: 'mobile-react-native',
      technologyStack: {
        languages: ['Dart'],
        frameworks: ['Flutter'],
        databases: [],
        tools: ['Git', 'Firebase'],
      },
      requireUnitTests: true,
      requireE2ETests: true,
      testingFrameworks: ['other'],
    },
  },
  {
    id: 'fastapi-backend',
    name: 'FastAPI Backend',
    description: 'Modern Python API with FastAPI',
    icon: '🐍',
    domain: 'web-backend',
    config: {
      domain: 'web-backend',
      technologyStack: {
        languages: ['Python'],
        frameworks: ['FastAPI'],
        databases: ['PostgreSQL'],
        tools: ['Docker', 'Git'],
      },
      requireUnitTests: true,
      testingFrameworks: ['pytest'],
      includeApiDocs: true,
      projectConfig: {
        serverPort: 8000,
        databaseConfig: {
          host: 'localhost',
          port: 5432,
          name: '',
        },
        apiConfig: {
          baseUrl: '/api/v1',
          version: 'v1',
          requiresAuth: true,
        },
      },
    },
  },
  {
    id: 'data-science',
    name: 'Data Science Project',
    description: 'ML/AI project with Python and Jupyter',
    icon: '📊',
    domain: 'data-science',
    config: {
      domain: 'data-science',
      technologyStack: {
        languages: ['Python'],
        frameworks: ['Jupyter', 'Pandas', 'Scikit-learn'],
        databases: ['PostgreSQL'],
        tools: ['Docker', 'Git', 'MLflow'],
      },
      requireUnitTests: true,
      testingFrameworks: ['pytest'],
    },
  },
  {
    id: 'express-api',
    name: 'Express.js API',
    description: 'Classic Node.js REST API with Express',
    icon: '🚂',
    domain: 'web-backend',
    config: {
      domain: 'web-backend',
      technologyStack: {
        languages: ['TypeScript'],
        frameworks: ['Express.js'],
        databases: ['MongoDB'],
        tools: ['Docker', 'Git', 'GitHub Actions'],
      },
      useTypeScript: true,
      requireUnitTests: true,
      testingFrameworks: ['jest'],
      includeApiDocs: true,
      projectConfig: {
        serverPort: 3000,
        databaseConfig: {
          host: 'localhost',
          port: 27017,
          name: '',
        },
        redisConfig: {
          enabled: true,
          host: 'localhost',
          port: 6379,
        },
        apiConfig: {
          baseUrl: '/api/v1',
          version: 'v1',
          requiresAuth: true,
        },
      },
    },
  },
  {
    id: 'nestjs-microservices',
    name: 'NestJS Microservices',
    description: 'Enterprise-grade Node.js framework',
    icon: '🏢',
    domain: 'web-backend',
    config: {
      domain: 'web-backend',
      technologyStack: {
        languages: ['TypeScript'],
        frameworks: ['NestJS'],
        databases: ['PostgreSQL'],
        tools: ['Docker', 'Kubernetes', 'Git', 'GitHub Actions'],
      },
      useTypeScript: true,
      requireUnitTests: true,
      requireIntegrationTests: true,
      testingFrameworks: ['jest'],
      includeApiDocs: true,
      useCICD: true,
      projectConfig: {
        serverPort: 3000,
        databaseConfig: {
          host: 'localhost',
          port: 5432,
          name: '',
        },
        redisConfig: {
          enabled: true,
          host: 'localhost',
          port: 6379,
        },
        apiConfig: {
          baseUrl: '/api/v1',
          version: 'v1',
          requiresAuth: true,
        },
      },
    },
  },
];

export function getPresetById(id: string): PresetConfig | undefined {
  return PRESET_CONFIGS.find(preset => preset.id === id);
}

export function getPresetsByDomain(domain: Domain): PresetConfig[] {
  return PRESET_CONFIGS.filter(preset => preset.domain === domain);
}

