// Domain types
export type Domain = 
  | 'general'
  | 'web-frontend'
  | 'web-backend'
  | 'web-fullstack'
  | 'mobile-ios'
  | 'mobile-android'
  | 'mobile-react-native'
  | 'data-science'
  | 'devops';

export type DevelopmentMethodology = 
  | 'agile'
  | 'scrum'
  | 'kanban'
  | 'waterfall'
  | 'lean'
  | 'custom';

export type CodeStylePreference = 
  | 'standard'
  | 'airbnb'
  | 'google'
  | 'prettier'
  | 'custom';

export type TestingFramework = 
  | 'jest'
  | 'vitest'
  | 'mocha'
  | 'pytest'
  | 'junit'
  | 'other';

// Technology Stack Options
export interface TechnologyStack {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  cssFramework?: string;
}

// Project Configuration
export interface ProjectConfiguration {
  serverPort?: number;
  databaseConfig?: {
    host?: string;
    port?: number;
    name?: string;
  };
  redisConfig?: {
    enabled: boolean;
    host?: string;
    port?: number;
  };
  apiConfig?: {
    baseUrl?: string;
    version?: string;
    requiresAuth: boolean;
  };
  envVariables?: {
    key: string;
    description: string;
    example?: string;
  }[];
}

// Form Data Structure
export interface ProjectFormData {
  // Basic Information
  projectName: string;
  projectDescription?: string;
  repositoryUrl?: string;
  
  // Domain & Tech Stack
  domain: Domain;
  technologyStack: TechnologyStack;
  
  // Team Settings
  teamSize: number;
  developmentMethodology: DevelopmentMethodology;
  
  // Code Preferences
  codeStylePreference: CodeStylePreference;
  useTypeScript: boolean;
  useLinter: boolean;
  useFormatter: boolean;
  
  // Testing Requirements
  requireUnitTests: boolean;
  requireIntegrationTests: boolean;
  requireE2ETests: boolean;
  testingFrameworks: TestingFramework[];
  minTestCoverage?: number;
  
  // Documentation Preferences
  includeApiDocs: boolean;
  includeArchitectureDiagrams: boolean;
  
  // Deployment Settings
  deploymentEnvironments: string[];
  useCICD: boolean;
  cicdTool?: string;
  
  // Project Configuration
  projectConfig?: ProjectConfiguration;
}

// Template Interfaces
export interface CursorRulesTemplate {
  domain: Domain;
  sections: {
    general: string[];
    codeQuality: string[];
    documentation: string[];
    testing: string[];
    security: string[];
    performance: string[];
    specific?: string[]; // Domain-specific rules
  };
}

export interface DevGuideSection {
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface DevGuideTemplate {
  overview: DevGuideSection;
  gettingStarted: DevGuideSection;
  architecture: DevGuideSection;
  codingStandards: DevGuideSection;
  gitWorkflow: DevGuideSection;
  testing: DevGuideSection;
  apiDocumentation?: DevGuideSection;
  deployment: DevGuideSection;
  troubleshooting: DevGuideSection;
}

// Generator Output
export interface GeneratedFiles {
  cursorrules: string;
  developmentGuide: string;
  envExample: string;
}

// Domain Display Information
export interface DomainInfo {
  id: Domain;
  label: string;
  description: string;
  icon: string;
  suggestedTech: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
  };
}

// Common Technology Options
export const COMMON_LANGUAGES = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'C#',
  'Ruby',
  'PHP',
  'Dart',
];

export const COMMON_WEB_FRAMEWORKS = [
  'Next.js',
  'React',
  'Vue.js',
  'Angular',
  'Svelte',
  'Express.js',
  'NestJS',
  'Bun + Hono',
  'Bun + Elysiajs',
  'FastAPI',
  'Django',
  'Flask',
  'Spring Boot',
  'Ruby on Rails',
  'Laravel',
];

export const COMMON_MOBILE_FRAMEWORKS = [
  'React Native',
  'Flutter',
  'SwiftUI',
  'UIKit',
  'Jetpack Compose',
  'Xamarin',
];

export const CSS_FRAMEWORKS = [
  'Tailwind CSS',
  'Bootstrap',
  'Material-UI (MUI)',
  'Chakra UI',
  'Ant Design',
  'Shadcn/ui',
  'DaisyUI',
  'Bulma',
  'Foundation',
  'Sass/SCSS',
  'Styled Components',
  'CSS Modules',
  'Emotion',
  'Vanilla CSS',
];

export const COMMON_DATABASES = [
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Elasticsearch',
  'SQLite',
  'DynamoDB',
  'Firebase',
  'Supabase',
];

export const COMMON_TOOLS = [
  'Git',
  'Docker',
  'Kubernetes',
  'GitHub Actions',
  'GitLab CI',
  'Jenkins',
  'Terraform',
  'AWS',
  'Google Cloud',
  'Azure',
  'Vercel',
  'Netlify',
];

export const DATA_SCIENCE_TOOLS = [
  'Jupyter',
  'Pandas',
  'NumPy',
  'Scikit-learn',
  'TensorFlow',
  'PyTorch',
  'MLflow',
  'Apache Spark',
  'Airflow',
];

export const DEVOPS_TOOLS = [
  'Docker',
  'Kubernetes',
  'Terraform',
  'Ansible',
  'Prometheus',
  'Grafana',
  'ELK Stack',
  'Jenkins',
  'ArgoCD',
  'Helm',
];

