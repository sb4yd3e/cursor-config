import { ProjectFormData } from '@/types';

export function generateSetup(data: ProjectFormData): string {
  const hasNode = data.technologyStack.languages.includes('JavaScript') || 
                  data.technologyStack.languages.includes('TypeScript') ||
                  data.technologyStack.frameworks.some(f => ['Next.js', 'React', 'Vue.js', 'Angular', 'Express.js', 'NestJS'].includes(f));
  
  const hasPython = data.technologyStack.languages.includes('Python');
  const hasDocker = data.technologyStack.tools.includes('Docker');
  const usesDatabase = data.technologyStack.databases.length > 0;

  return `## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your development machine:

#### Required Software

${hasNode ? `- **Node.js** (v18.x or higher) and **npm** (v9.x or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: \`node --version\` and \`npm --version\`
` : ''}${hasPython ? `- **Python** (3.9 or higher)
  - Download from [python.org](https://python.org/)
  - Verify installation: \`python --version\`
` : ''}${hasDocker ? `- **Docker** (latest stable version)
  - Download from [docker.com](https://www.docker.com/get-started)
  - Verify installation: \`docker --version\`
  - Optional: Docker Compose for orchestration
` : ''}${data.technologyStack.tools.includes('Git') || true ? `- **Git** (latest version)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: \`git --version\`
` : ''}
#### Recommended Tools

${data.useLinter || data.useFormatter ? `- **Code Editor:** VS Code, WebStorm, or similar with the following extensions:
${data.useLinter ? `  - Linter extensions for ${data.codeStylePreference}\n` : ''}${data.useFormatter ? `  - Code formatter (Prettier or similar)\n` : ''}${data.useTypeScript ? `  - TypeScript support\n` : ''}  - Git integration
` : '- **Code Editor:** VS Code, WebStorm, or similar\n'}${usesDatabase ? '- **Database Client:** DBeaver, pgAdmin, or similar for database management\n' : ''}${data.includeApiDocs ? '- **API Testing Tool:** Postman, Insomnia, or similar\n' : ''}
### Installation

#### 1. Clone the Repository

\`\`\`bash
git clone ${data.repositoryUrl || '<repository-url>'}
cd ${data.projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

${hasNode ? `#### 2. Install Node.js Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`
` : ''}${hasPython ? `#### 2. Set Up Python Environment

\`\`\`bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
.\\venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt
\`\`\`
` : ''}
#### ${hasNode || hasPython ? '3' : '2'}. Environment Configuration

Create a \`.env\` file in the project root (copy from \`.env.example\`):

\`\`\`bash
cp .env.example .env
\`\`\`

Configure the following environment variables:

\`\`\`env
# Application
NODE_ENV=development
PORT=${data.projectConfig?.serverPort || 3000}
APP_URL=http://localhost:${data.projectConfig?.serverPort || 3000}

${usesDatabase && data.projectConfig?.databaseConfig ? `# Database
DATABASE_URL=postgresql://<username>:<password>@${data.projectConfig.databaseConfig.host || 'localhost'}:${data.projectConfig.databaseConfig.port || 5432}/${data.projectConfig.databaseConfig.name || data.projectName.toLowerCase().replace(/\s+/g, '_')}
DB_HOST=${data.projectConfig.databaseConfig.host || 'localhost'}
DB_PORT=${data.projectConfig.databaseConfig.port || 5432}
DB_NAME=${data.projectConfig.databaseConfig.name || data.projectName.toLowerCase().replace(/\s+/g, '_')}
DB_USER=<your-username>
DB_PASSWORD=<your-password>
` : ''}${data.projectConfig?.redisConfig?.enabled ? `# Redis
REDIS_HOST=${data.projectConfig.redisConfig.host || 'localhost'}
REDIS_PORT=${data.projectConfig.redisConfig.port || 6379}
REDIS_PASSWORD=<your-redis-password>
` : ''}${data.projectConfig?.apiConfig ? `# API Configuration
API_BASE_URL=${data.projectConfig.apiConfig.baseUrl || '/api/v1'}
API_VERSION=${data.projectConfig.apiConfig.version || 'v1'}
${data.projectConfig.apiConfig.requiresAuth ? `JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d
` : ''}` : ''}${data.includeApiDocs ? `# External API Keys (if needed)
EXTERNAL_API_KEY=<your-api-key>
EXTERNAL_API_SECRET=<your-api-secret>
` : ''}
# Add other environment variables as needed
\`\`\`

${usesDatabase ? `#### ${hasNode || hasPython ? '4' : '3'}. Database Setup

${hasDocker ? `**Option 1: Using Docker (Recommended)**

\`\`\`bash
# Start database container
docker-compose up -d database

# Wait for database to be ready
docker-compose ps
\`\`\`

**Option 2: Local Installation**
` : ''}
1. Install ${data.technologyStack.databases[0] || 'your database'}
2. Create a new database:

\`\`\`sql
CREATE DATABASE ${data.projectName.toLowerCase().replace(/\s+/g, '_')};
\`\`\`

3. Run migrations:

\`\`\`bash
${hasNode ? 'npm run migrate' : 'python manage.py migrate'}
\`\`\`

4. (Optional) Seed the database:

\`\`\`bash
${hasNode ? 'npm run seed' : 'python manage.py seed'}
\`\`\`
` : ''}
${hasDocker ? `### Running with Docker

The project includes Docker configuration for easy setup:

\`\`\`bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
\`\`\`

The application will be available at \`http://localhost:${data.domain.includes('web') ? '3000' : '8000'}\`
` : ''}
### Running the Application

#### Development Mode

${hasNode ? `\`\`\`bash
npm run dev
\`\`\`
` : hasPython ? `\`\`\`bash
python manage.py runserver
# or
uvicorn main:app --reload
\`\`\`
` : `\`\`\`bash
# Add your start command here
\`\`\`
`}
The application will start at \`http://localhost:${data.projectConfig?.serverPort || (data.domain.includes('web') ? 3000 : 8000)}\`${data.projectConfig?.apiConfig ? `

**API Endpoints:** \`http://localhost:${data.projectConfig?.serverPort || 3000}${data.projectConfig.apiConfig.baseUrl}\`
` : ''}

#### Production Mode

${hasNode ? `\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`
` : `\`\`\`bash
# Add your production start commands here
\`\`\`
`}
### Running Tests

${data.requireUnitTests || data.requireIntegrationTests || data.requireE2ETests ? `\`\`\`bash
${hasNode ? `# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
` : hasPython ? `# Run all tests
pytest

# Run with coverage
pytest --cov

# Run specific test file
pytest tests/test_example.py
` : '# Add your test commands here'}
\`\`\`
` : 'Tests configuration coming soon...'}
### Configuration Summary

${data.projectConfig?.serverPort ? `**Server Port:** ${data.projectConfig.serverPort}\n` : ''}${data.projectConfig?.databaseConfig ? `**Database:** ${data.projectConfig.databaseConfig.host}:${data.projectConfig.databaseConfig.port}/${data.projectConfig.databaseConfig.name}\n` : ''}${data.projectConfig?.redisConfig?.enabled ? `**Redis:** ${data.projectConfig.redisConfig.host}:${data.projectConfig.redisConfig.port}\n` : ''}${data.projectConfig?.apiConfig ? `**API Base URL:** ${data.projectConfig.apiConfig.baseUrl}\n` : ''}${data.projectConfig?.apiConfig?.requiresAuth ? `**Authentication:** Required (JWT)\n` : ''}

### Verification

To verify your setup is correct:

1. ✓ The application starts without errors
${usesDatabase ? '2. ✓ Database connection is successful\n' : ''}${data.projectConfig?.redisConfig?.enabled ? `${usesDatabase ? '3' : '2'}. ✓ Redis connection is successful\n` : ''}${data.includeApiDocs ? `${(usesDatabase || data.projectConfig?.redisConfig?.enabled) ? '3' : '2'}. ✓ API endpoints are accessible\n` : ''}${usesDatabase || data.includeApiDocs || data.projectConfig?.redisConfig?.enabled ? `4. ✓ Tests pass successfully\n` : '2. ✓ Tests pass successfully\n'}
### Troubleshooting

#### Common Issues

**Issue: Port already in use**
\`\`\`bash
# Find and kill process using the port
${hasNode ? `lsof -ti:${data.projectConfig?.serverPort || 3000} | xargs kill -9` : `lsof -ti:${data.projectConfig?.serverPort || 8000} | xargs kill -9`}

# Or change the port in .env file
PORT=${(data.projectConfig?.serverPort || 3000) + 1}
\`\`\`

${usesDatabase ? `**Issue: Database connection failed**
- Verify database is running
- Check database credentials in .env
- Ensure database exists
- Check firewall settings
` : ''}${hasNode ? `**Issue: Node modules errors**
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`
` : ''}${hasPython ? `**Issue: Python dependencies conflicts**
\`\`\`bash
# Create fresh virtual environment
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`
` : ''}
For more issues, check the [Troubleshooting](#troubleshooting) section at the end of this guide.

---
`;
}

