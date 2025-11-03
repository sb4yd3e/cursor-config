import { ProjectFormData } from '@/types';
import { generateOverview } from '../templates/devguide/overview';
import { generateSetup } from '../templates/devguide/setup';
import { generateArchitecture } from '../templates/devguide/architecture';
import { generateCodingStandards } from '../templates/devguide/coding-standards';
import { generateGitWorkflow } from '../templates/devguide/git-workflow';
import { generateTesting } from '../templates/devguide/testing';
import { generateDeployment } from '../templates/devguide/deployment';
import { generateTroubleshooting } from '../templates/devguide/troubleshooting';

export function generateDevelopmentGuide(data: ProjectFormData): string {
  const sections = [
    generateOverview(data),
    generateSetup(data),
    generateArchitecture(data),
    generateCodingStandards(data),
    generateGitWorkflow(data),
    generateTesting(data),
  ];
  
  // Add API documentation section if enabled
  if (data.includeApiDocs) {
    sections.push(generateApiDocumentation(data));
  }
  
  sections.push(
    generateDeployment(data),
    generateTroubleshooting(data)
  );
  
  return sections.join('\n\n');
}

function generateApiDocumentation(data: ProjectFormData): string {
  return `## API Documentation

### API Overview

This section documents the RESTful API endpoints for the ${data.projectName} application.

**Base URL:**
- Development: \`http://localhost:3000/api/v1\`
- Staging: \`https://staging-api.example.com/api/v1\`
- Production: \`https://api.example.com/api/v1\`

### Authentication

All API requests require authentication using JWT tokens.

**Authentication Flow:**

1. Obtain access token:
   \`\`\`http
   POST /api/v1/auth/login
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "password123"
   }
   \`\`\`

2. Use token in subsequent requests:
   \`\`\`http
   GET /api/v1/users/me
   Authorization: Bearer <access_token>
   \`\`\`

### Response Format

All API responses follow a consistent format:

**Success Response:**
\`\`\`json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
\`\`\`

### Status Codes

- **200 OK:** Request succeeded
- **201 Created:** Resource created successfully
- **400 Bad Request:** Invalid request data
- **401 Unauthorized:** Authentication required
- **403 Forbidden:** Insufficient permissions
- **404 Not Found:** Resource not found
- **422 Unprocessable Entity:** Validation failed
- **429 Too Many Requests:** Rate limit exceeded
- **500 Internal Server Error:** Server error

### Rate Limiting

API requests are rate limited to prevent abuse:

- **Authenticated users:** 1000 requests per hour
- **Unauthenticated requests:** 100 requests per hour

Rate limit headers are included in responses:
\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1623456789
\`\`\`

### API Endpoints

#### Authentication

**POST /api/v1/auth/register**

Register a new user account.

\`\`\`http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
\`\`\`

**POST /api/v1/auth/login**

Authenticate and obtain access token.

**POST /api/v1/auth/refresh**

Refresh access token using refresh token.

**POST /api/v1/auth/logout**

Invalidate current session.

#### Users

**GET /api/v1/users/me**

Get current authenticated user profile.

**PATCH /api/v1/users/me**

Update current user profile.

**GET /api/v1/users/:id**

Get user by ID (admin only).

#### [Add Your Endpoints]

Document your specific endpoints here:

**GET /api/v1/resource**

Description of the endpoint.

**POST /api/v1/resource**

Description of the endpoint.

### WebSocket API

${data.domain.includes('web') ? `
If your application uses WebSocket connections:

**Connection:**
\`\`\`javascript
const ws = new WebSocket('ws://localhost:3000/ws');

ws.onopen = () => {
  console.log('Connected');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
\`\`\`

**Events:**

- \`connect\`: Client connected
- \`disconnect\`: Client disconnected
- \`message\`: Message received
- \`error\`: Error occurred
` : ''}

### Error Codes

| Code | Description |
|------|-------------|
| \`VALIDATION_ERROR\` | Request validation failed |
| \`AUTHENTICATION_REQUIRED\` | User must be authenticated |
| \`INSUFFICIENT_PERMISSIONS\` | User lacks required permissions |
| \`RESOURCE_NOT_FOUND\` | Requested resource doesn't exist |
| \`DUPLICATE_RESOURCE\` | Resource already exists |
| \`INTERNAL_ERROR\` | Server encountered an error |

### API Testing

Use the provided Postman/Insomnia collection for testing:

\`\`\`bash
# Import collection
# File: api-collection.json
\`\`\`

Or use curl:

\`\`\`bash
# Get access token
TOKEN=$(curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"password"}' \\
  | jq -r '.data.accessToken')

# Make authenticated request
curl http://localhost:3000/api/v1/users/me \\
  -H "Authorization: Bearer $TOKEN"
\`\`\`

### API Versioning

We use URL versioning for the API:

- Current version: \`v1\`
- Endpoint format: \`/api/v1/*\`

When breaking changes are introduced, a new version will be released (e.g., \`v2\`).

### API Documentation Tools

Access interactive API documentation:

- **Swagger UI:** http://localhost:3000/api-docs
- **OpenAPI Spec:** http://localhost:3000/api-docs/openapi.json

---
`;
}

export { generateApiDocumentation };

