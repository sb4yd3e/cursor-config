import { ProjectFormData } from '@/types';

export function generateWebRules(data: ProjectFormData): string {
  const isFrontend = data.domain === 'web-frontend' || data.domain === 'web-fullstack';
  const isBackend = data.domain === 'web-backend' || data.domain === 'web-fullstack';
  const usesHono = data.technologyStack.frameworks.includes('Bun + Hono');
  const usesElysiajs = data.technologyStack.frameworks.includes('Bun + Elysiajs');
  const usesBun = usesHono || usesElysiajs;
  const cssFramework = data.technologyStack.cssFramework;
  
  return `# Web Development Cursor AI Rules

## Project: ${data.projectName}
${data.projectDescription ? `Description: ${data.projectDescription}\n` : ''}
Type: ${data.domain.replace('web-', '').replace('-', ' ').toUpperCase()}

${isFrontend ? `## Frontend Development

### Component Architecture
- Create reusable, composable components
- Follow component-driven development
- Keep components small and focused (< 200 lines)
- Separate presentational and container components
- Use proper component lifecycle methods
- Implement proper error boundaries

### State Management
- Use appropriate state management solution
- Keep state as local as possible
- Lift state only when necessary
- Use context API for global state when appropriate
- Implement proper state updates (immutability)
- Avoid prop drilling

### React/Vue/Angular Best Practices
${data.technologyStack.frameworks.includes('React') || data.technologyStack.frameworks.includes('Next.js') ? `- Use functional components with hooks
- Use useEffect properly with dependencies
- Memoize expensive computations with useMemo
- Use useCallback for function props
- Implement proper key props in lists
- Follow React hooks rules
` : ''}${data.technologyStack.frameworks.includes('Vue.js') ? `- Use Composition API for better organization
- Implement proper reactive data handling
- Use computed properties effectively
- Implement proper component communication
` : ''}${data.technologyStack.frameworks.includes('Next.js') ? `- Use Next.js App Router properly
- Implement proper data fetching patterns
- Use Server Components where appropriate
- Optimize for performance with Next.js features
- Implement proper routing and navigation
- Use Image component for optimization
` : ''}
### UI/UX Best Practices
- Follow responsive design principles
- Implement mobile-first design
- Ensure cross-browser compatibility
- Follow accessibility guidelines (WCAG 2.1)
- Use semantic HTML
- Implement proper focus management
- Add appropriate ARIA labels
- Support keyboard navigation
- Test with screen readers

### Styling
${cssFramework === 'Tailwind CSS' ? `- Use Tailwind CSS utility classes
- Create reusable component variants
- Use Tailwind's responsive modifiers
- Implement dark mode support
- Use arbitrary values sparingly
- Configure theme in tailwind.config
` : cssFramework === 'Bootstrap' ? `- Use Bootstrap's grid system
- Follow Bootstrap component patterns
- Customize with SASS variables
- Use utility classes appropriately
` : cssFramework?.includes('MUI') || cssFramework?.includes('Material') ? `- Use Material-UI components
- Follow Material Design guidelines
- Customize theme with createTheme
- Use sx prop for styling
` : cssFramework === 'Chakra UI' ? `- Use Chakra UI components
- Follow Chakra's design system
- Use style props effectively
- Implement color mode
` : cssFramework === 'Styled Components' ? `- Use styled-components for component styling
- Implement theming properly
- Avoid style leakage
- Use CSS-in-JS best practices
` : cssFramework === 'Shadcn/ui' ? `- Use Shadcn/ui components
- Customize with Tailwind
- Copy and own components
- Follow accessibility patterns
` : ''}- Keep styles organized and maintainable
- Use CSS variables for theming
- Implement consistent spacing and typography
- Optimize CSS bundle size
- Avoid inline styles when possible

### Performance Optimization
- Implement code splitting
- Use lazy loading for routes and components
- Optimize images and assets
- Minimize bundle size
- Use production builds
- Implement proper caching strategies
- Optimize rendering performance
- Use virtual scrolling for long lists
- Implement proper loading states
- Optimize Web Vitals (LCP, FID, CLS)

### Forms and Validation
- Use form libraries (React Hook Form, Formik)
- Implement proper validation (client and server)
- Provide immediate feedback
- Handle form errors gracefully
- Implement proper form accessibility
- Use controlled components appropriately

` : ''}${isBackend ? `## Backend Development

${usesBun ? `### Bun Runtime
${usesHono ? `- Use Hono framework best practices
- Leverage Hono's middleware system
- Use type-safe routing
- Implement proper error handling with Hono
- Take advantage of Bun's speed
- Use Bun's native APIs when available
` : usesElysiajs ? `- Use Elysia.js framework patterns
- Leverage Elysia's plugin system
- Use type-safe schema validation
- Implement proper middleware chain
- Take advantage of Bun's performance
- Use Elysia's decorators effectively
` : ''}- Use Bun's built-in test runner
- Leverage Bun's fast package manager
- Use Bun.serve() for optimal performance
- Implement proper TypeScript types
- Use Bun's bundler when needed

` : ''}### API Design
- Follow RESTful principles or GraphQL best practices
- Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Implement proper status codes
- Version APIs appropriately (/api/v1/)
- Design consistent API responses
- Document all endpoints
- Implement proper pagination
- Use proper query parameters

### Request/Response Handling
- Validate all input data
- Sanitize user input
- Use proper serialization
- Implement request/response logging
- Handle errors consistently
- Return meaningful error messages
- Use proper content types

### Authentication & Authorization
- Implement secure authentication
- Use JWT or session-based auth appropriately
- Implement proper password hashing
- Use refresh tokens
- Implement role-based access control (RBAC)
- Protect sensitive endpoints
- Implement rate limiting
- Use HTTPS only

### Database Operations
${data.technologyStack.databases.includes('PostgreSQL') || data.technologyStack.databases.includes('MySQL') ? `- Use ORMs properly (Prisma, TypeORM, Sequelize)
- Write efficient SQL queries
- Use transactions when needed
- Implement proper indexes
- Use prepared statements (prevent SQL injection)
` : ''}${data.technologyStack.databases.includes('MongoDB') ? `- Follow MongoDB best practices
- Design efficient schemas
- Use proper indexes
- Implement data validation
` : ''}- Implement connection pooling
- Handle database errors gracefully
- Use migrations for schema changes
- Implement proper data validation
- Avoid N+1 query problems

### Middleware
- Implement proper middleware chain
- Use middleware for cross-cutting concerns
- Handle errors in middleware
- Implement request logging middleware
- Add security middleware (helmet, cors)
- Implement authentication middleware

### Background Jobs
- Use job queues for long-running tasks
- Implement proper retry logic
- Monitor job failures
- Use appropriate scheduling
- Implement idempotent operations

` : ''}## Web Security

### Common Vulnerabilities (OWASP Top 10)
- Prevent SQL/NoSQL injection
- Prevent XSS (Cross-Site Scripting)
- Prevent CSRF (Cross-Site Request Forgery)
- Implement proper authentication
- Secure sensitive data
- Implement proper access controls
- Use secure dependencies
- Implement security logging
- Prevent XXE (XML External Entity)
- Use security headers

### Security Headers
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Referrer-Policy

### Data Security
- Encrypt sensitive data
- Use HTTPS everywhere
- Implement proper CORS
- Validate and sanitize all inputs
- Use secure cookies
- Implement rate limiting

## Testing

${data.requireUnitTests ? `### Unit Testing
- Test components in isolation
- Test business logic thoroughly
- Use ${data.testingFrameworks.join(', ')}
- Mock external dependencies
- Test edge cases
- Achieve ${data.minTestCoverage || 80}% coverage

` : ''}${data.requireIntegrationTests ? `### Integration Testing
- Test API endpoints
- Test database operations
- Test third-party integrations
- Use proper test databases

` : ''}${data.requireE2ETests ? `### E2E Testing
- Test critical user flows
- Test cross-browser compatibility
- Test responsive design
- Use Playwright, Cypress, or similar

` : ''}### Frontend Testing
- Test user interactions
- Test component rendering
- Test form submissions
- Test error states
- Test loading states

### Backend Testing
- Test all API endpoints
- Test authentication flows
- Test error handling
- Test database operations
- Test middleware

## Performance

### Frontend Performance
- Minimize JavaScript bundle
- Optimize images (WebP, lazy loading)
- Use CDN for static assets
- Implement service workers
- Cache API responses
- Use skeleton screens
- Optimize font loading

### Backend Performance
- Implement caching (Redis)
- Optimize database queries
- Use database indexes
- Implement API response caching
- Use load balancing
- Monitor performance metrics
- Implement connection pooling

## Monitoring & Logging

### Application Monitoring
- Log errors and exceptions
- Monitor API response times
- Track user errors
- Monitor server resources
- Set up alerts

### Tools
- Use APM tools (New Relic, Datadog)
- Implement error tracking (Sentry)
- Use logging services
- Monitor uptime

## API Documentation

${data.includeApiDocs ? `### Documentation Requirements
- Document all endpoints
- Include request/response examples
- Document authentication
- Document error codes
- Use OpenAPI/Swagger
- Keep documentation up-to-date
- Include code examples
- Document rate limits
` : ''}
## Deployment

${data.useCICD ? `### CI/CD Pipeline
- Implement automated testing
- Use ${data.cicdTool || 'CI/CD tool'}
- Automate deployments
- Implement rollback procedures
- Use environment variables
- Run security scans
` : ''}
### Deployment Best Practices
- Use environment-specific configs
- Implement health checks
- Use containerization (Docker)
- Implement zero-downtime deployments
- Monitor deployments
- Keep production logs

---
Generated with Cursor Config Generator
`;
}

