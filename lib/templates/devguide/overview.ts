import { ProjectFormData } from '@/types';

export function generateOverview(data: ProjectFormData): string {
  return `# ${data.projectName} - Development Guide

## Project Overview

### Description
${data.projectDescription || 'A comprehensive software project.'}

${data.repositoryUrl ? `### Repository
${data.repositoryUrl}\n` : ''}
### Project Type
**Domain:** ${data.domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

### Technology Stack

#### Languages
${data.technologyStack.languages.length > 0 ? data.technologyStack.languages.map(lang => `- ${lang}`).join('\n') : '- (To be determined)'}

#### Frameworks & Libraries
${data.technologyStack.frameworks.length > 0 ? data.technologyStack.frameworks.map(fw => `- ${fw}`).join('\n') : '- (To be determined)'}

${data.technologyStack.databases.length > 0 ? `#### Databases
${data.technologyStack.databases.map(db => `- ${db}`).join('\n')}
` : ''}
${data.technologyStack.tools.length > 0 ? `#### Tools & Infrastructure
${data.technologyStack.tools.map(tool => `- ${tool}`).join('\n')}
` : ''}
### Team Information

- **Team Size:** ${data.teamSize} ${data.teamSize === 1 ? 'developer' : 'developers'}
- **Development Methodology:** ${data.developmentMethodology.charAt(0).toUpperCase() + data.developmentMethodology.slice(1)}

### Project Goals

<!-- Add your project goals here -->
- Deliver high-quality, maintainable code
- Follow best practices and coding standards
- Maintain comprehensive documentation
- Ensure security and performance
- Foster team collaboration

### Key Features

<!-- Add your key features here -->
- Feature 1: [Description]
- Feature 2: [Description]
- Feature 3: [Description]

### Project Timeline

<!-- Add your timeline/milestones here -->
- Phase 1: [Description and timeline]
- Phase 2: [Description and timeline]
- Phase 3: [Description and timeline]

---
`;
}

