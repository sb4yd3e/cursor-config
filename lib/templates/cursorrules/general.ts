import { ProjectFormData } from '@/types';

export function generateGeneralRules(data: ProjectFormData): string {
  return `# Cursor AI Rules for ${data.projectName}

## Project Overview
**Name:** ${data.projectName}
${data.projectDescription ? `**Description:** ${data.projectDescription}\n` : ''}**Domain:** ${data.domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
${data.repositoryUrl ? `**Repository:** ${data.repositoryUrl}\n` : ''}
## Tech Stack Context

**Languages:** ${data.technologyStack.languages.join(', ')}
**Frameworks:** ${data.technologyStack.frameworks.join(', ')}
${data.technologyStack.databases.length > 0 ? `**Databases:** ${data.technologyStack.databases.join(', ')}\n` : ''}${data.technologyStack.cssFramework ? `**CSS Framework:** ${data.technologyStack.cssFramework}\n` : ''}**Tools:** ${data.technologyStack.tools.join(', ')}

${data.projectConfig ? `## Project Configuration

${data.projectConfig.serverPort ? `**Server Port:** ${data.projectConfig.serverPort}\n` : ''}${data.projectConfig.databaseConfig ? `**Database:** ${data.projectConfig.databaseConfig.host}:${data.projectConfig.databaseConfig.port}/${data.projectConfig.databaseConfig.name}\n` : ''}${data.projectConfig.redisConfig?.enabled ? `**Redis:** ${data.projectConfig.redisConfig.host}:${data.projectConfig.redisConfig.port}\n` : ''}${data.projectConfig.apiConfig ? `**API:** ${data.projectConfig.apiConfig.baseUrl} (${data.projectConfig.apiConfig.requiresAuth ? 'Auth Required' : 'No Auth'})\n` : ''}
` : ''}

## Code Quality & Standards

### General Principles
- Write clean, readable, and maintainable code
- Follow SOLID principles and design patterns
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Avoid code duplication (DRY principle)
- Write self-documenting code with clear intent

### Naming Conventions
- Use descriptive names that reveal intent
- Follow language-specific naming conventions
${data.useTypeScript ? '- Use TypeScript for type safety' : ''}
- Constants should be in UPPER_SNAKE_CASE
- Classes and interfaces should be in PascalCase
- Variables and functions should be in camelCase

### Code Organization
- Group related functionality together
- Separate concerns appropriately
- Keep file sizes reasonable (< 300 lines ideally)
- Organize imports logically (stdlib, external, internal)
- Use consistent file and folder structure

## Documentation

### Code Documentation
- Add JSDoc/docstrings for public APIs
- Document complex logic and algorithms
- Explain "why" not "what" in comments
- Keep comments up-to-date with code changes
- Use TODO/FIXME/NOTE comments appropriately

### README and Docs
- Maintain up-to-date README.md
- Document setup and installation steps
- Include usage examples
- Document API endpoints and interfaces
- Keep architecture documentation current

## Error Handling

### Best Practices
- Handle errors gracefully
- Use appropriate error types
- Log errors with context
- Provide meaningful error messages
- Never swallow errors silently
- Use try-catch blocks appropriately
- Validate input data

### Logging
- Log important operations
- Include relevant context in logs
- Use appropriate log levels (error, warn, info, debug)
- Don't log sensitive information

## Testing

${data.requireUnitTests ? `### Unit Testing
- Write unit tests for core functionality
- Aim for ${data.minTestCoverage || 80}% code coverage
- Use ${data.testingFrameworks.join(', ')} for testing
- Test edge cases and error conditions
- Keep tests independent and isolated
- Use descriptive test names

` : ''}${data.requireIntegrationTests ? `### Integration Testing
- Test component interactions
- Verify API integrations
- Test database operations
- Mock external dependencies appropriately

` : ''}${data.requireE2ETests ? `### E2E Testing
- Test critical user flows
- Verify system behavior end-to-end
- Maintain stable test environments

` : ''}### Testing Principles
- Write tests before fixing bugs
- Keep tests simple and readable
- Use arrange-act-assert pattern
- Don't test implementation details

## Security

### Security Best Practices
- Never commit secrets or credentials
- Use environment variables for configuration
- Validate and sanitize user input
- Implement proper authentication and authorization
- Use HTTPS for all network communications
- Keep dependencies up-to-date
- Follow OWASP security guidelines
- Implement rate limiting
- Use parameterized queries (prevent SQL injection)

### Data Protection
- Encrypt sensitive data at rest and in transit
- Follow data privacy regulations (GDPR, CCPA)
- Implement proper access controls
- Audit security-critical operations

## Performance

### Optimization Guidelines
- Optimize for readability first, then performance
- Profile before optimizing
- Use appropriate data structures
- Implement caching where beneficial
- Minimize network requests
- Use lazy loading when appropriate
- Monitor and measure performance

### Resource Management
- Clean up resources properly
- Avoid memory leaks
- Use connection pooling
- Implement proper timeouts

## Version Control

### Git Practices
- Write clear, descriptive commit messages
- Make small, focused commits
- Use feature branches
- Keep commits atomic
- Never commit generated files
- Review changes before committing

### Commit Message Format
\`\`\`
<type>: <subject>

<body>

<footer>
\`\`\`

Types: feat, fix, docs, style, refactor, test, chore

## Code Review

### Review Guidelines
- Review code for logic, not style (use linters)
- Be constructive and respectful
- Ask questions to understand
- Suggest improvements
- Approve when satisfied
- Check for security issues

## Development Workflow

### Methodology: ${data.developmentMethodology.toUpperCase()}
- Follow team's ${data.developmentMethodology} process
- Participate in team ceremonies
- Update task status regularly
- Communicate blockers early

### Best Practices
- Pull latest changes before starting work
- Test locally before pushing
- Write meaningful PR descriptions
- Link PRs to issues/tickets
- Request reviews from appropriate team members

## AI Assistance Guidelines

### Project-Specific Context for AI

When generating code, AI should consider:
- **Primary Language:** ${data.technologyStack.languages[0] || 'TypeScript'}
- **Framework:** ${data.technologyStack.frameworks[0] || 'N/A'}
- **Testing Framework:** ${data.testingFrameworks.join(', ') || 'N/A'}
${data.projectConfig?.serverPort ? `- **Default Port:** ${data.projectConfig.serverPort}\n` : ''}${data.projectConfig?.apiConfig ? `- **API Base:** ${data.projectConfig.apiConfig.baseUrl}\n` : ''}
### Code Generation Guidelines

When AI generates code:
1. **Use Project Stack:** Always use ${data.technologyStack.languages[0]} with ${data.technologyStack.frameworks[0] || 'project frameworks'}
2. **Follow Conventions:** Match existing naming and structure patterns
3. **Include Types:** ${data.useTypeScript ? 'Always add TypeScript types' : 'Add appropriate type hints'}
4. **Add Tests:** ${data.requireUnitTests ? `Include unit tests with ${data.testingFrameworks[0]}` : 'Include appropriate tests'}
5. **Handle Errors:** Add comprehensive error handling
6. **Document Code:** Include JSDoc/docstrings for public APIs

### When Using Cursor AI
- Provide clear context and requirements
- Review generated code carefully
- Ensure generated code follows these rules
- Test AI-generated code thoroughly
- Refactor if needed for clarity
- Don't blindly accept suggestions
- Verify security implications
- Check performance impact

### Code Completion Preferences
- Prefer ${data.codeStylePreference} style guide
${data.useTypeScript ? '- Always suggest TypeScript types\n' : ''}${data.useLinter ? '- Follow linter rules\n' : ''}${data.useFormatter ? '- Auto-format with project formatter\n' : ''}- Suggest imports automatically
- Include error boundaries
- Add loading states for async operations

### AI-Assisted Refactoring
- Maintain existing functionality
- Update tests accordingly
- Keep changes focused and atomic
- Document breaking changes
- Preserve performance characteristics
${data.useLinter ? `\n## Linting

- Run linter before committing
- Fix all linting errors
- Use ${data.codeStylePreference} style guide
- Configure linter in project
- Use pre-commit hooks
` : ''}${data.useFormatter ? `\n## Code Formatting

- Use automatic code formatter
- Configure formatter in project
- Format code before committing
- Use consistent formatting across team
` : ''}
---
Generated with Cursor Config Generator
`;
}

