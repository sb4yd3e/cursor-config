import { ProjectFormData } from '@/types';

export function generateCodingStandards(data: ProjectFormData): string {
  const primaryLang = data.technologyStack.languages[0] || 'JavaScript';
  
  return `## Coding Standards

### General Principles

1. **Write Clean Code**
   - Code should be self-explanatory
   - Prefer readability over cleverness
   - Keep it simple (KISS principle)
   - Don't repeat yourself (DRY principle)

2. **Follow SOLID Principles**
   - Single Responsibility Principle
   - Open/Closed Principle
   - Liskov Substitution Principle
   - Interface Segregation Principle
   - Dependency Inversion Principle

3. **Code for Maintainability**
   - Write code that others can understand
   - Consider future developers
   - Document complex logic
   - Keep functions and classes focused

### Naming Conventions

#### General Rules
- Use descriptive and meaningful names
- Avoid abbreviations unless widely known
- Be consistent throughout the codebase
- Use pronounceable names

#### Specific Conventions

${primaryLang === 'TypeScript' || primaryLang === 'JavaScript' ? `**TypeScript/JavaScript:**
- Variables & Functions: \`camelCase\`
  \`\`\`typescript
  const userName = 'John';
  function calculateTotal() {}
  \`\`\`

- Classes & Interfaces: \`PascalCase\`
  \`\`\`typescript
  class UserService {}
  interface UserData {}
  \`\`\`

- Constants: \`UPPER_SNAKE_CASE\`
  \`\`\`typescript
  const MAX_RETRY_COUNT = 3;
  const API_BASE_URL = 'https://api.example.com';
  \`\`\`

- Private Properties: prefix with underscore (optional)
  \`\`\`typescript
  private _internalState: string;
  \`\`\`

- Boolean Variables: use \`is\`, \`has\`, \`should\` prefix
  \`\`\`typescript
  const isActive = true;
  const hasPermission = false;
  const shouldUpdate = true;
  \`\`\`
` : primaryLang === 'Python' ? `**Python:**
- Variables & Functions: \`snake_case\`
  \`\`\`python
  user_name = 'John'
  def calculate_total():
      pass
  \`\`\`

- Classes: \`PascalCase\`
  \`\`\`python
  class UserService:
      pass
  \`\`\`

- Constants: \`UPPER_SNAKE_CASE\`
  \`\`\`python
  MAX_RETRY_COUNT = 3
  API_BASE_URL = 'https://api.example.com'
  \`\`\`

- Private Methods: prefix with single underscore
  \`\`\`python
  def _internal_method(self):
      pass
  \`\`\`

- Boolean Variables: use \`is_\`, \`has_\`, \`should_\` prefix
  \`\`\`python
  is_active = True
  has_permission = False
  \`\`\`
` : `**General:**
- Follow language-specific conventions
- Be consistent with existing code
- Use meaningful names
- Avoid single-letter variables (except in loops)
`}
#### File Naming
- Use lowercase with hyphens: \`user-service.ts\`
- Or use camelCase: \`userService.ts\`
- Be consistent across the project
- Name files after their main export

### Code Formatting

${data.useFormatter ? `#### Automated Formatting

We use **${data.codeStylePreference === 'prettier' ? 'Prettier' : data.codeStylePreference}** for automatic code formatting.

**Configuration:**
- Format on save in your editor
- Run formatter before committing
- Configuration file: \`.prettierrc\` or similar

**Format Command:**
\`\`\`bash
npm run format
# or
npm run format:check
\`\`\`
` : ''}
#### Formatting Rules

**Indentation:**
- Use ${primaryLang === 'Python' ? '4' : '2'} spaces (no tabs)
- Be consistent throughout the file

**Line Length:**
- Maximum 100-120 characters per line
- Break long lines at logical points

**Spacing:**
\`\`\`${primaryLang === 'Python' ? 'python' : 'typescript'}
${primaryLang === 'Python' ? `# Good
def calculate_total(items, tax_rate):
    return sum(items) * (1 + tax_rate)

# Bad
def calculate_total(items,tax_rate):
    return sum(items)*(1+tax_rate)
` : `// Good
function calculateTotal(items, taxRate) {
  return items.reduce((sum, item) => sum + item, 0) * (1 + taxRate);
}

// Bad
function calculateTotal(items,taxRate){
  return items.reduce((sum,item)=>sum+item,0)*(1+taxRate);
}
`}\`\`\`

**Braces and Brackets:**
${primaryLang !== 'Python' ? `- Use consistent brace style
- Open brace on same line (K&R style)
\`\`\`typescript
// Good
if (condition) {
  doSomething();
}

// Avoid
if (condition)
{
  doSomething();
}
\`\`\`
` : ''}
### Function Guidelines

**Function Size:**
- Keep functions small (< 50 lines ideally)
- One function, one responsibility
- Extract complex logic into separate functions

**Function Parameters:**
- Limit parameters (max 3-4 recommended)
- Use object parameters for multiple values
- Use default parameters when appropriate

${primaryLang === 'TypeScript' || primaryLang === 'JavaScript' ? `\`\`\`typescript
// Good - Object parameter
interface CreateUserParams {
  name: string;
  email: string;
  role?: string;
}

function createUser({ name, email, role = 'user' }: CreateUserParams) {
  // implementation
}

// Avoid - Too many parameters
function createUser(name: string, email: string, age: number, role: string, status: string) {
  // implementation
}
\`\`\`
` : ''}
**Return Values:**
- Be explicit about return types
- Avoid side effects in getter functions
- Return early to reduce nesting

### Comments and Documentation

**When to Comment:**
- Explain "why", not "what"
- Document complex algorithms
- Add TODO/FIXME for future work
- Document public APIs

**Comment Style:**

${primaryLang === 'TypeScript' || primaryLang === 'JavaScript' ? `**JSDoc for Functions:**
\`\`\`typescript
/**
 * Calculates the total price including tax
 * @param items - Array of item prices
 * @param taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns Total price with tax applied
 */
function calculateTotal(items: number[], taxRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item, 0);
  return subtotal * (1 + taxRate);
}
\`\`\`
` : primaryLang === 'Python' ? `**Docstrings for Functions:**
\`\`\`python
def calculate_total(items: list[float], tax_rate: float) -> float:
    """
    Calculate the total price including tax.
    
    Args:
        items: List of item prices
        tax_rate: Tax rate as decimal (e.g., 0.1 for 10%)
    
    Returns:
        Total price with tax applied
    """
    subtotal = sum(items)
    return subtotal * (1 + tax_rate)
\`\`\`
` : ''}
**Inline Comments:**
\`\`\`${primaryLang === 'Python' ? 'python' : 'typescript'}
${primaryLang === 'Python' ? `# Good - Explains why
# We use a temporary variable to avoid recalculating
cached_value = expensive_calculation()

# Avoid - States the obvious
# Assign x to 5
x = 5
` : `// Good - Explains why
// Cache the result to avoid recalculating on each render
const memoizedValue = useMemo(() => expensiveCalculation(), [dependency]);

// Avoid - States the obvious
// Set x to 5
const x = 5;
`}\`\`\`

### Error Handling

**General Principles:**
- Always handle errors explicitly
- Don't swallow errors silently
- Provide meaningful error messages
- Log errors with context

${primaryLang === 'TypeScript' || primaryLang === 'JavaScript' ? `**Try-Catch Usage:**
\`\`\`typescript
// Good
async function fetchUserData(userId: string) {
  try {
    const response = await api.get(\`/users/\${userId}\`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error('Failed to fetch user', { userId, error: error.message });
      throw new Error(\`Unable to fetch user data for ID: \${userId}\`);
    }
    throw error;
  }
}

// Avoid - Silent failure
async function fetchUserData(userId: string) {
  try {
    const response = await api.get(\`/users/\${userId}\`);
    return response.data;
  } catch (error) {
    // No error handling
  }
}
\`\`\`
` : primaryLang === 'Python' ? `**Exception Handling:**
\`\`\`python
# Good
def fetch_user_data(user_id: str) -> dict:
    try:
        response = api.get(f'/users/{user_id}')
        return response.json()
    except ApiError as e:
        logger.error(f'Failed to fetch user: {user_id}', exc_info=True)
        raise ValueError(f'Unable to fetch user data for ID: {user_id}') from e
    except Exception as e:
        logger.error(f'Unexpected error: {e}', exc_info=True)
        raise

# Avoid - Bare except
def fetch_user_data(user_id: str):
    try:
        response = api.get(f'/users/{user_id}')
        return response.json()
    except:
        pass
\`\`\`
` : ''}
### Type Safety

${data.useTypeScript ? `**TypeScript Best Practices:**

- Always define types for function parameters and returns
- Avoid \`any\` type - use \`unknown\` if type is truly unknown
- Use union types instead of \`any\`
- Define interfaces for object shapes
- Use type guards for narrowing types

\`\`\`typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return api.get<User>(\`/users/\${id}\`);
}

// Avoid
function getUser(id: any): Promise<any> {
  return api.get(\`/users/\${id}\`);
}
\`\`\`
` : `**Type Hints (if applicable):**

- Use type hints for function signatures
- Define types for complex data structures
- Use type checking tools
`}
### Code Organization

**Import Ordering:**
1. Standard library imports
2. Third-party library imports
3. Local application imports

${primaryLang === 'TypeScript' || primaryLang === 'JavaScript' ? `\`\`\`typescript
// Standard library (Node.js)
import * as path from 'path';
import * as fs from 'fs';

// Third-party libraries
import React from 'react';
import { useRouter } from 'next/navigation';

// Local imports
import { UserService } from '@/services/user-service';
import { Button } from '@/components/ui/button';
import type { User } from '@/types';
\`\`\`
` : ''}
**File Organization:**
- One class/component per file (generally)
- Group related functionality
- Keep files focused and cohesive
- Use index files for exports

### Testing Standards

${data.requireUnitTests ? `**Unit Test Requirements:**

- Test file naming: \`[name].test.ts\` or \`[name].spec.ts\`
- Test all public functions
- Test edge cases and error conditions
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

\`\`\`${primaryLang === 'Python' ? 'python' : 'typescript'}
${primaryLang === 'Python' ? `# Good test structure
def test_calculate_total_with_valid_items():
    # Arrange
    items = [10.0, 20.0, 30.0]
    tax_rate = 0.1
    
    # Act
    result = calculate_total(items, tax_rate)
    
    # Assert
    assert result == 66.0
` : `// Good test structure
describe('calculateTotal', () => {
  it('should calculate total with tax for valid items', () => {
    // Arrange
    const items = [10, 20, 30];
    const taxRate = 0.1;
    
    // Act
    const result = calculateTotal(items, taxRate);
    
    // Assert
    expect(result).toBe(66);
  });
});
`}\`\`\`
` : ''}
### Performance Guidelines

**General Performance:**
- Avoid premature optimization
- Profile before optimizing
- Optimize algorithms first, then implementation
- Cache expensive computations
- Lazy load when possible

**Specific Guidelines:**
${primaryLang === 'TypeScript' || primaryLang === 'JavaScript' ? `- Use \`useMemo\` and \`useCallback\` appropriately in React
- Avoid inline object/array creation in render
- Implement virtual scrolling for long lists
- Use code splitting and lazy loading
` : primaryLang === 'Python' ? `- Use generators for large datasets
- Implement proper caching
- Use list comprehensions for simple operations
- Profile with cProfile
` : ''}
### Security Guidelines

**Never:**
- Commit secrets or API keys
- Log sensitive information
- Trust user input without validation
- Use \`eval()\` or similar dangerous functions

**Always:**
- Validate and sanitize input
- Use parameterized queries
- Implement proper authentication
- Keep dependencies updated
- Follow OWASP guidelines

### Code Review Checklist

Before submitting code for review:

- [ ] Code follows naming conventions
- [ ] Functions are small and focused
- [ ] Complex logic is commented
- [ ] No console.logs or debug code
- [ ] Tests are written and passing
- [ ] No linting errors
- [ ] Error handling is implemented
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Documentation is updated

---
`;
}

