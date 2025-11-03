import { ProjectFormData } from '@/types';

export function generateEnvExample(data: ProjectFormData): string {
  const usesDatabase = data.technologyStack.databases.length > 0;
  const isWeb = data.domain.includes('web');
  
  let envContent = `# Environment Variables
# Copy this file to .env and fill in the values

# Application
NODE_ENV=development
PORT=${data.projectConfig?.serverPort || 3000}
APP_URL=http://localhost:${data.projectConfig?.serverPort || 3000}
APP_NAME=${data.projectName}

`;

  // Database configuration
  if (usesDatabase && data.projectConfig?.databaseConfig) {
    const dbType = data.technologyStack.databases[0];
    const dbPort = dbType.includes('PostgreSQL') ? 5432 : 
                   dbType.includes('MySQL') ? 3306 : 
                   dbType.includes('MongoDB') ? 27017 : 
                   data.projectConfig.databaseConfig.port || 5432;
    
    envContent += `# Database Configuration
DB_HOST=${data.projectConfig.databaseConfig.host || 'localhost'}
DB_PORT=${dbPort}
DB_NAME=${data.projectConfig.databaseConfig.name || data.projectName.toLowerCase().replace(/\s+/g, '_')}
DB_USER=your_database_user
DB_PASSWORD=your_database_password

`;

    if (dbType.includes('PostgreSQL') || dbType.includes('MySQL')) {
      envContent += `# Database URL (alternative to individual variables)
DATABASE_URL=${dbType.includes('PostgreSQL') ? 'postgresql' : 'mysql'}://\${DB_USER}:\${DB_PASSWORD}@\${DB_HOST}:\${DB_PORT}/\${DB_NAME}

`;
    } else if (dbType.includes('MongoDB')) {
      envContent += `# MongoDB URL
MONGODB_URI=mongodb://\${DB_HOST}:\${DB_PORT}/\${DB_NAME}

`;
    }
  }

  // Redis configuration
  if (data.projectConfig?.redisConfig?.enabled) {
    envContent += `# Redis Configuration
REDIS_HOST=${data.projectConfig.redisConfig.host || 'localhost'}
REDIS_PORT=${data.projectConfig.redisConfig.port || 6379}
REDIS_PASSWORD=your_redis_password
REDIS_DB=0

`;
  }

  // API Configuration
  if (data.projectConfig?.apiConfig) {
    envContent += `# API Configuration
API_BASE_URL=${data.projectConfig.apiConfig.baseUrl || '/api/v1'}
API_VERSION=${data.projectConfig.apiConfig.version || 'v1'}

`;

    if (data.projectConfig.apiConfig.requiresAuth) {
      envContent += `# Authentication
JWT_SECRET=your_jwt_secret_key_here_min_32_characters
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

`;
    }
  }

  // External API keys (if API docs are included)
  if (data.includeApiDocs) {
    envContent += `# External API Keys (if needed)
# Add your external service API keys here
# STRIPE_API_KEY=your_stripe_key
# SENDGRID_API_KEY=your_sendgrid_key
# AWS_ACCESS_KEY_ID=your_aws_access_key
# AWS_SECRET_ACCESS_KEY=your_aws_secret_key

`;
  }

  // Frontend specific (if applicable)
  if (isWeb && (data.domain === 'web-frontend' || data.domain === 'web-fullstack')) {
    envContent += `# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:${data.projectConfig?.serverPort || 3000}/api
# Add other NEXT_PUBLIC_ variables as needed

`;
  }

  // CI/CD and deployment
  if (data.useCICD) {
    envContent += `# CI/CD Configuration
CI=true
${data.cicdTool?.includes('GitHub') ? '# GitHub Actions will set this automatically\n' : ''}
`;
  }

  // Environment-specific notes
  envContent += `# Environment-specific settings
# For production, make sure to:
# 1. Use strong, unique passwords
# 2. Never commit .env files to version control
# 3. Use environment-specific values
# 4. Enable HTTPS in production
# 5. Use secure secret keys (minimum 32 characters)

# Logging
LOG_LEVEL=debug
# Options: error, warn, info, debug

`;

  // Testing configuration
  if (data.requireUnitTests || data.requireIntegrationTests) {
    envContent += `# Testing
TEST_DATABASE_URL=postgresql://test_user:test_password@localhost:5432/test_db
NODE_ENV_TEST=test

`;
  }

  // Data Science specific
  if (data.domain === 'data-science') {
    envContent += `# Data Science Configuration
DATA_PATH=./data
MODEL_PATH=./models
JUPYTER_PORT=8888

`;
  }

  // DevOps specific
  if (data.domain === 'devops') {
    envContent += `# DevOps Configuration
TERRAFORM_STATE_BUCKET=your-terraform-state-bucket
ANSIBLE_CONFIG=./ansible.cfg

`;
  }

  envContent += `# Add your custom environment variables below
# CUSTOM_VAR=value
`;

  return envContent;
}

