import { ProjectFormData } from '@/types';

export function generateTesting(data: ProjectFormData): string {
  const primaryFramework = data.testingFrameworks[0] || 'Jest';
  
  return `## Testing Strategy

### Testing Philosophy

- **Write tests first** (Test-Driven Development encouraged)
- **Test behavior, not implementation**
- **Keep tests simple and readable**
- **Maintain high test coverage** (target: ${data.minTestCoverage || 80}%)
- **Fast, reliable, and independent tests**

### Testing Pyramid

\`\`\`
        /\\
       /  \\       E2E Tests (Few)
      /    \\      - Test critical user flows
     /------\\     - Slow but high confidence
    /        \\    
   /   Integration Tests (Some)
  /    - Test component interactions
 /     - API and database tests
/-------------------------------\\
        Unit Tests (Many)
        - Fast and isolated
        - Test individual functions
\`\`\`

${data.requireUnitTests ? `### Unit Testing

#### Overview
Unit tests verify individual functions, methods, or components in isolation.

#### Framework: ${primaryFramework}

#### Test Structure

**File Naming:**
- Test files: \`[name].test.ts\` or \`[name].spec.ts\`
- Location: Co-located with source or in \`tests/\` directory

**Test Organization:**

\`\`\`typescript
describe('ComponentName or FunctionName', () => {
  // Setup
  beforeAll(() => {
    // Runs once before all tests
  });

  beforeEach(() => {
    // Runs before each test
  });

  afterEach(() => {
    // Runs after each test
  });

  afterAll(() => {
    // Runs once after all tests
  });

  // Test cases
  describe('specific functionality', () => {
    it('should do something specific', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = someFunction(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
\`\`\`

#### Unit Test Examples

**Testing Functions:**

\`\`\`typescript
// src/utils/calculator.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// src/utils/calculator.test.ts
import { add, divide } from './calculator';

describe('Calculator utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-2, 3)).toBe(1);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error on division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });
});
\`\`\`

${data.domain.includes('web-frontend') || data.domain === 'web-fullstack' ? `**Testing React Components:**

\`\`\`typescript
// components/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
\`\`\`
` : ''}
#### Mocking

**Mocking Functions:**

\`\`\`typescript
// Mock implementation
const mockFn = jest.fn();
mockFn.mockReturnValue('mocked value');
mockFn.mockResolvedValue('async mocked value');

// Mock module
jest.mock('./api', () => ({
  fetchUser: jest.fn(),
}));

import { fetchUser } from './api';
(fetchUser as jest.Mock).mockResolvedValue({ id: 1, name: 'John' });
\`\`\`

**Mocking External Dependencies:**

\`\`\`typescript
// __mocks__/axios.ts
export default {
  get: jest.fn(),
  post: jest.fn(),
};
\`\`\`

#### Best Practices

- ✅ Test one thing per test
- ✅ Use descriptive test names
- ✅ Follow AAA pattern (Arrange, Act, Assert)
- ✅ Keep tests independent
- ✅ Mock external dependencies
- ✅ Test edge cases and errors
- ❌ Don't test implementation details
- ❌ Don't make tests dependent on each other
- ❌ Don't write slow tests in unit tests

` : ''}${data.requireIntegrationTests ? `### Integration Testing

#### Overview
Integration tests verify that multiple components work together correctly.

#### What to Test
- API endpoint responses
- Database operations
- External service integrations
- Component interactions
- State management flow

#### Integration Test Examples

**Testing API Endpoints:**

\`\`\`typescript
import request from 'supertest';
import app from '../app';
import { setupTestDB, teardownTestDB } from './test-utils';

describe('User API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(response.body.id).toBeDefined();
    });

    it('should return 400 for invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      // Create user first
      const createResponse = await request(app)
        .post('/api/users')
        .send({ name: 'Jane Doe', email: 'jane@example.com' });

      const userId = createResponse.body.id;

      // Get user
      const response = await request(app)
        .get(\`/api/users/\${userId}\`)
        .expect(200);

      expect(response.body.name).toBe('Jane Doe');
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/99999')
        .expect(404);
    });
  });
});
\`\`\`

**Testing Database Operations:**

\`\`\`typescript
import { UserRepository } from '../repositories/user-repository';
import { setupTestDB, teardownTestDB } from './test-utils';

describe('UserRepository', () => {
  let userRepo: UserRepository;

  beforeAll(async () => {
    await setupTestDB();
    userRepo = new UserRepository();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  afterEach(async () => {
    await userRepo.deleteAll();
  });

  it('should create and retrieve user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const created = await userRepo.create(userData);
    expect(created.id).toBeDefined();

    const retrieved = await userRepo.findById(created.id);
    expect(retrieved).toMatchObject(userData);
  });

  it('should update user', async () => {
    const user = await userRepo.create({
      name: 'John Doe',
      email: 'john@example.com',
    });

    await userRepo.update(user.id, { name: 'Jane Doe' });

    const updated = await userRepo.findById(user.id);
    expect(updated.name).toBe('Jane Doe');
  });
});
\`\`\`

#### Test Database Setup

\`\`\`typescript
// test-utils/database.ts
import { db } from '../database';

export async function setupTestDB() {
  // Use test database
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  
  // Run migrations
  await db.migrate.latest();
  
  // Seed test data if needed
  await db.seed.run();
}

export async function teardownTestDB() {
  // Clean up
  await db.migrate.rollback();
  await db.destroy();
}
\`\`\`

` : ''}${data.requireE2ETests ? `### End-to-End Testing

#### Overview
E2E tests verify complete user flows from start to finish in a real browser environment.

#### Framework
We use **Playwright** (or Cypress) for E2E testing.

#### E2E Test Examples

**Testing User Flow:**

\`\`\`typescript
import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test('should allow user to sign up, log in, and log out', async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:3000');

    // Sign up
    await page.click('text=Sign Up');
    await page.fill('[name=name]', 'John Doe');
    await page.fill('[name=email]', 'john@example.com');
    await page.fill('[name=password]', 'SecurePassword123');
    await page.click('button[type=submit]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.locator('text=Welcome, John')).toBeVisible();

    // Log out
    await page.click('text=Log Out');
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('[name=email]', 'wrong@example.com');
    await page.fill('[name=password]', 'wrongpassword');
    await page.click('button[type=submit]');

    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
});

test.describe('Shopping Cart Flow', () => {
  test('should add items to cart and checkout', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3000/login');
    await page.fill('[name=email]', 'test@example.com');
    await page.fill('[name=password]', 'password');
    await page.click('button[type=submit]');

    // Browse products
    await page.goto('http://localhost:3000/products');

    // Add to cart
    await page.click('[data-testid=add-to-cart-1]');
    await expect(page.locator('[data-testid=cart-count]')).toHaveText('1');

    // Go to cart
    await page.click('[data-testid=cart-icon]');
    await expect(page).toHaveURL(/.*cart/);

    // Checkout
    await page.click('text=Proceed to Checkout');
    await page.fill('[name=address]', '123 Main St');
    await page.fill('[name=city]', 'New York');
    await page.click('button[type=submit]');

    // Verify order confirmation
    await expect(page.locator('text=Order confirmed')).toBeVisible();
  });
});
\`\`\`

#### Page Object Model

\`\`\`typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[name=email]');
    this.passwordInput = page.locator('[name=password]');
    this.submitButton = page.locator('button[type=submit]');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// Using Page Object
import { LoginPage } from './pages/LoginPage';

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('test@example.com', 'password');
  await expect(page).toHaveURL(/.*dashboard/);
});
\`\`\`

` : ''}### Test Coverage

#### Measuring Coverage

\`\`\`bash
# Run tests with coverage
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
\`\`\`

#### Coverage Goals

- **Overall:** ${data.minTestCoverage || 80}%+ coverage
- **Critical paths:** 90%+ coverage
- **Utility functions:** 100% coverage
- **UI components:** 80%+ coverage

#### Coverage Reports

Coverage reports show:
- **Line coverage:** % of lines executed
- **Branch coverage:** % of branches taken
- **Function coverage:** % of functions called
- **Statement coverage:** % of statements executed

### Running Tests

#### Commands

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test path/to/test.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="User"

# Run with coverage
npm run test:coverage

${data.requireE2ETests ? `# Run E2E tests
npm run test:e2e

# Run E2E in headed mode
npm run test:e2e:headed
` : ''}\`\`\`

### Continuous Integration

Tests are automatically run on:
- Every push to feature branches
- Every pull request
- Before merging to main/develop

**CI Configuration:**

\`\`\`yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      ${data.requireE2ETests ? '- run: npm run test:e2e\n      ' : ''}- uses: codecov/codecov-action@v3
\`\`\`

### Test Data Management

#### Fixtures

\`\`\`typescript
// tests/fixtures/users.ts
export const mockUsers = {
  validUser: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  },
  adminUser: {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
};
\`\`\`

#### Test Factories

\`\`\`typescript
// tests/factories/user-factory.ts
export function createUser(overrides = {}) {
  return {
    id: Math.random().toString(),
    name: 'Test User',
    email: 'test@example.com',
    createdAt: new Date(),
    ...overrides,
  };
}
\`\`\`

### Testing Best Practices

**Do:**
✅ Write tests alongside code
✅ Test happy paths and edge cases
✅ Keep tests simple and readable
✅ Use meaningful test descriptions
✅ Mock external dependencies
✅ Clean up after tests
✅ Run tests before committing

**Don't:**
❌ Test implementation details
❌ Write flaky tests
❌ Make tests depend on each other
❌ Ignore failing tests
❌ Skip tests without good reason
❌ Test third-party libraries

### Debugging Tests

\`\`\`typescript
// Add debugger statement
it('should do something', () => {
  debugger; // Test will pause here
  expect(something).toBe(true);
});

// Use console.log
it('should do something', () => {
  console.log('Debug info:', someValue);
  expect(something).toBe(true);
});

// Run single test with --runInBand
npm test -- --runInBand --testNamePattern="specific test"
\`\`\`

---
`;
}

