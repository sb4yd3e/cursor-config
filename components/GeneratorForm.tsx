'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProjectFormData, Domain, COMMON_LANGUAGES, COMMON_WEB_FRAMEWORKS, COMMON_MOBILE_FRAMEWORKS, COMMON_DATABASES, COMMON_TOOLS, CSS_FRAMEWORKS, DATA_SCIENCE_TOOLS, DEVOPS_TOOLS } from '@/types';
import { DomainSelector } from './DomainSelector';
import { PreviewPanel } from './PreviewPanel';
import { PresetSelector } from './PresetSelector';

// Validation schema
const formSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  projectDescription: z.string().optional(),
  repositoryUrl: z.string().url().optional().or(z.literal('')),
  domain: z.enum(['general', 'web-frontend', 'web-backend', 'web-fullstack', 'mobile-ios', 'mobile-android', 'mobile-react-native', 'data-science', 'devops']),
  teamSize: z.number().min(1).max(1000),
  developmentMethodology: z.enum(['agile', 'scrum', 'kanban', 'waterfall', 'lean', 'custom']),
  codeStylePreference: z.enum(['standard', 'airbnb', 'google', 'prettier', 'custom']),
  useTypeScript: z.boolean(),
  useLinter: z.boolean(),
  useFormatter: z.boolean(),
  requireUnitTests: z.boolean(),
  requireIntegrationTests: z.boolean(),
  requireE2ETests: z.boolean(),
  minTestCoverage: z.number().min(0).max(100).optional(),
  includeApiDocs: z.boolean(),
  includeArchitectureDiagrams: z.boolean(),
  useCICD: z.boolean(),
  cicdTool: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function GeneratorForm() {
  const [generatedFiles, setGeneratedFiles] = useState<{ cursorrules: string; developmentGuide: string; envExample: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['TypeScript']);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['Next.js']);
  const [selectedDatabases, setSelectedDatabases] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>(['Git', 'Docker']);
  const [cssFramework, setCssFramework] = useState<string>('Tailwind CSS');
  const [testingFrameworks, setTestingFrameworks] = useState<string[]>(['jest']);
  const [deploymentEnvironments, setDeploymentEnvironments] = useState<string[]>(['development', 'staging', 'production']);
  
  // Project Configuration
  const [serverPort, setServerPort] = useState<number>(3000);
  const [databaseHost, setDatabaseHost] = useState<string>('localhost');
  const [databasePort, setDatabasePort] = useState<number>(5432);
  const [databaseName, setDatabaseName] = useState<string>('');
  const [useRedis, setUseRedis] = useState<boolean>(false);
  const [redisHost, setRedisHost] = useState<string>('localhost');
  const [redisPort, setRedisPort] = useState<number>(6379);
  const [apiVersion, setApiVersion] = useState<string>('v1');
  const [requiresAuth, setRequiresAuth] = useState<boolean>(true);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      projectDescription: '',
      repositoryUrl: '',
      domain: 'general',
      teamSize: 5,
      developmentMethodology: 'agile',
      codeStylePreference: 'prettier',
      useTypeScript: true,
      useLinter: true,
      useFormatter: true,
      requireUnitTests: true,
      requireIntegrationTests: false,
      requireE2ETests: false,
      minTestCoverage: 80,
      includeApiDocs: true,
      includeArchitectureDiagrams: true,
      useCICD: true,
      cicdTool: 'GitHub Actions',
    },
  });

  const domain = watch('domain');
  const requireUnitTests = watch('requireUnitTests');
  const useCICD = watch('useCICD');

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    
    const projectData: ProjectFormData = {
      ...data,
      technologyStack: {
        languages: selectedLanguages,
        frameworks: selectedFrameworks,
        databases: selectedDatabases,
        tools: selectedTools,
        cssFramework: (domain.includes('web-frontend') || domain === 'web-fullstack') ? cssFramework : undefined,
      },
      testingFrameworks: testingFrameworks as any[],
      deploymentEnvironments,
      projectConfig: {
        serverPort: serverPort,
        databaseConfig: selectedDatabases.length > 0 ? {
          host: databaseHost,
          port: databasePort,
          name: databaseName || data.projectName.toLowerCase().replace(/\s+/g, '_'),
        } : undefined,
        redisConfig: {
          enabled: useRedis,
          host: redisHost,
          port: redisPort,
        },
        apiConfig: (domain.includes('web-backend') || domain === 'web-fullstack') ? {
          baseUrl: `/api/${apiVersion}`,
          version: apiVersion,
          requiresAuth: requiresAuth,
        } : undefined,
      },
    };

    try {
      // Client-side generation for static export
      const { generateCursorRules } = await import('@/lib/generators/cursorrules-generator');
      const { generateDevelopmentGuide } = await import('@/lib/generators/devguide-generator');
      const { generateEnvExample } = await import('@/lib/generators/env-generator');
      
      const cursorrules = generateCursorRules(projectData);
      const developmentGuide = generateDevelopmentGuide(projectData);
      const envExample = generateEnvExample(projectData);
      
      setGeneratedFiles({
        cursorrules,
        developmentGuide,
        envExample,
      });
    } catch (error) {
      console.error('Failed to generate files:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Get relevant technologies based on domain
  const getRelevantLanguages = () => {
    if (domain.includes('mobile-ios')) return ['Swift', 'Objective-C'];
    if (domain.includes('mobile-android')) return ['Kotlin', 'Java'];
    if (domain.includes('mobile-react-native')) return ['TypeScript', 'JavaScript'];
    if (domain === 'data-science') return ['Python', 'R', 'Julia', 'Scala'];
    if (domain === 'devops') return ['Python', 'Go', 'Bash', 'Ruby'];
    if (domain.includes('web')) return ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'Ruby', 'C#'];
    return COMMON_LANGUAGES;
  };

  const getRelevantFrameworks = () => {
    if (domain.includes('mobile')) return COMMON_MOBILE_FRAMEWORKS;
    if (domain.includes('web')) return COMMON_WEB_FRAMEWORKS;
    if (domain === 'data-science') return ['Jupyter', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch'];
    return [];
  };

  const getRelevantTools = () => {
    if (domain === 'devops') return DEVOPS_TOOLS;
    if (domain === 'data-science') return DATA_SCIENCE_TOOLS;
    return COMMON_TOOLS;
  };

  const showDatabases = domain.includes('web') || domain === 'data-science' || domain === 'devops';
  const showCssFramework = domain.includes('web-frontend') || domain === 'web-fullstack';

  const handlePresetSelect = (presetConfig: Partial<ProjectFormData>) => {
    // Apply preset configuration
    if (presetConfig.domain) setValue('domain', presetConfig.domain);
    if (presetConfig.technologyStack) {
      setSelectedLanguages(presetConfig.technologyStack.languages || []);
      setSelectedFrameworks(presetConfig.technologyStack.frameworks || []);
      setSelectedDatabases(presetConfig.technologyStack.databases || []);
      setSelectedTools(presetConfig.technologyStack.tools || []);
      if (presetConfig.technologyStack.cssFramework) {
        setCssFramework(presetConfig.technologyStack.cssFramework);
      }
    }
    if (presetConfig.useTypeScript !== undefined) setValue('useTypeScript', presetConfig.useTypeScript);
    if (presetConfig.useLinter !== undefined) setValue('useLinter', presetConfig.useLinter);
    if (presetConfig.useFormatter !== undefined) setValue('useFormatter', presetConfig.useFormatter);
    if (presetConfig.requireUnitTests !== undefined) setValue('requireUnitTests', presetConfig.requireUnitTests);
    if (presetConfig.requireIntegrationTests !== undefined) setValue('requireIntegrationTests', presetConfig.requireIntegrationTests);
    if (presetConfig.requireE2ETests !== undefined) setValue('requireE2ETests', presetConfig.requireE2ETests);
    if (presetConfig.testingFrameworks) setTestingFrameworks(presetConfig.testingFrameworks as string[]);
    if (presetConfig.minTestCoverage) setValue('minTestCoverage', presetConfig.minTestCoverage);
    if (presetConfig.includeApiDocs !== undefined) setValue('includeApiDocs', presetConfig.includeApiDocs);
    if (presetConfig.useCICD !== undefined) setValue('useCICD', presetConfig.useCICD);
    if (presetConfig.cicdTool) setValue('cicdTool', presetConfig.cicdTool);
    
    // Apply project configuration
    if (presetConfig.projectConfig) {
      if (presetConfig.projectConfig.serverPort) setServerPort(presetConfig.projectConfig.serverPort);
      if (presetConfig.projectConfig.databaseConfig) {
        setDatabaseHost(presetConfig.projectConfig.databaseConfig.host || 'localhost');
        setDatabasePort(presetConfig.projectConfig.databaseConfig.port || 5432);
        setDatabaseName(presetConfig.projectConfig.databaseConfig.name || '');
      }
      if (presetConfig.projectConfig.redisConfig) {
        setUseRedis(presetConfig.projectConfig.redisConfig.enabled);
        setRedisHost(presetConfig.projectConfig.redisConfig.host || 'localhost');
        setRedisPort(presetConfig.projectConfig.redisConfig.port || 6379);
      }
      if (presetConfig.projectConfig.apiConfig) {
        setApiVersion(presetConfig.projectConfig.apiConfig.version || 'v1');
        setRequiresAuth(presetConfig.projectConfig.apiConfig.requiresAuth);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cursor Config Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate .cursorrules and DEVELOPMENT_GUIDE.md for your project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Preset Selector */}
              <PresetSelector onSelectPreset={handlePresetSelect} />

              {/* Project Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Project Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    {...register('projectName')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="My Awesome Project"
                  />
                  {errors.projectName && (
                    <p className="text-sm text-red-600 mt-1">{errors.projectName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('projectDescription')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your project..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repository URL
                  </label>
                  <input
                    {...register('repositoryUrl')}
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              {/* Domain Selection */}
              <DomainSelector
                value={domain}
                onChange={(newDomain: Domain) => setValue('domain', newDomain)}
              />

              {/* Technology Stack */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Technology Stack</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {getRelevantLanguages().map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleSelection(lang, selectedLanguages, setSelectedLanguages)}
                        className={`
                          px-3 py-1 text-sm rounded-full transition-colors
                          ${selectedLanguages.includes(lang)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }
                        `}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {getRelevantFrameworks().length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frameworks & Libraries
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {getRelevantFrameworks().map(fw => (
                        <button
                          key={fw}
                          type="button"
                          onClick={() => toggleSelection(fw, selectedFrameworks, setSelectedFrameworks)}
                          className={`
                            px-3 py-1 text-sm rounded-full transition-colors
                            ${selectedFrameworks.includes(fw)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }
                          `}
                        >
                          {fw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {showCssFramework && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CSS Framework
                    </label>
                    <select
                      value={cssFramework}
                      onChange={(e) => setCssFramework(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {CSS_FRAMEWORKS.map(css => (
                        <option key={css} value={css}>{css}</option>
                      ))}
                    </select>
                  </div>
                )}

                {showDatabases && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Databases
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_DATABASES.map(db => (
                        <button
                          key={db}
                          type="button"
                          onClick={() => toggleSelection(db, selectedDatabases, setSelectedDatabases)}
                          className={`
                            px-3 py-1 text-sm rounded-full transition-colors
                            ${selectedDatabases.includes(db)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }
                          `}
                        >
                          {db}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tools & Infrastructure
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {getRelevantTools().map(tool => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleSelection(tool, selectedTools, setSelectedTools)}
                        className={`
                          px-3 py-1 text-sm rounded-full transition-colors
                          ${selectedTools.includes(tool)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }
                        `}
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Settings */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Team Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Size
                  </label>
                  <input
                    {...register('teamSize', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Development Methodology
                  </label>
                  <select
                    {...register('developmentMethodology')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="agile">Agile</option>
                    <option value="scrum">Scrum</option>
                    <option value="kanban">Kanban</option>
                    <option value="waterfall">Waterfall</option>
                    <option value="lean">Lean</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              {/* Code Preferences */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Code Preferences</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code Style
                  </label>
                  <select
                    {...register('codeStylePreference')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="prettier">Prettier</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="google">Google</option>
                    <option value="standard">Standard</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      {...register('useTypeScript')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Use TypeScript</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      {...register('useLinter')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Use Linter</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      {...register('useFormatter')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Use Code Formatter</span>
                  </label>
                </div>
              </div>

              {/* Testing Requirements */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Testing Requirements</h2>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      {...register('requireUnitTests')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Unit Tests</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      {...register('requireIntegrationTests')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Integration Tests</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      {...register('requireE2ETests')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">E2E Tests</span>
                  </label>
                </div>

                {requireUnitTests && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Test Coverage (%)
                    </label>
                    <input
                      {...register('minTestCoverage', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Project Configuration */}
              {(domain.includes('web') || domain === 'data-science' || domain === 'devops') && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Project Configuration</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-3">
                      Pre-configure default settings for your project setup
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(domain.includes('web-backend') || domain === 'web-fullstack') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Server Port
                          </label>
                          <input
                            type="number"
                            value={serverPort}
                            onChange={(e) => setServerPort(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="3000"
                          />
                        </div>
                      )}

                      {selectedDatabases.length > 0 && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Database Host
                            </label>
                            <input
                              type="text"
                              value={databaseHost}
                              onChange={(e) => setDatabaseHost(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="localhost"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Database Port
                            </label>
                            <input
                              type="number"
                              value={databasePort}
                              onChange={(e) => setDatabasePort(Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="5432"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Database Name
                            </label>
                            <input
                              type="text"
                              value={databaseName}
                              onChange={(e) => setDatabaseName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Auto-generated from project name"
                            />
                          </div>
                        </>
                      )}

                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={useRedis}
                            onChange={(e) => setUseRedis(e.target.checked)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">Use Redis for caching/sessions</span>
                        </label>
                      </div>

                      {useRedis && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Redis Host
                            </label>
                            <input
                              type="text"
                              value={redisHost}
                              onChange={(e) => setRedisHost(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="localhost"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Redis Port
                            </label>
                            <input
                              type="number"
                              value={redisPort}
                              onChange={(e) => setRedisPort(Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="6379"
                            />
                          </div>
                        </>
                      )}

                      {(domain.includes('web-backend') || domain === 'web-fullstack') && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              API Version
                            </label>
                            <input
                              type="text"
                              value={apiVersion}
                              onChange={(e) => setApiVersion(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="v1"
                            />
                          </div>

                          <div className="flex items-center">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={requiresAuth}
                                onChange={(e) => setRequiresAuth(e.target.checked)}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">API requires authentication</span>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Documentation & Deployment */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Documentation & Deployment</h2>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      {...register('includeApiDocs')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include API Documentation</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      {...register('includeArchitectureDiagrams')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Include Architecture Diagrams</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      {...register('useCICD')}
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Use CI/CD</span>
                  </label>
                </div>

                {useCICD && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CI/CD Tool
                    </label>
                    <input
                      {...register('cicdTool')}
                      type="text"
                      placeholder="GitHub Actions, GitLab CI, Jenkins..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Files'}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            {generatedFiles ? (
              <PreviewPanel
                cursorrules={generatedFiles.cursorrules}
                developmentGuide={generatedFiles.developmentGuide}
                envExample={generatedFiles.envExample}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Yet</h3>
                <p className="text-gray-600">
                  Fill in the form and click "Generate Files" to see the preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

