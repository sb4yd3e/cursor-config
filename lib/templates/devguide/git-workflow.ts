import { ProjectFormData } from '@/types';

export function generateGitWorkflow(data: ProjectFormData): string {
  return `## Git Workflow

### Branching Strategy

We follow a **${data.developmentMethodology === 'agile' || data.developmentMethodology === 'scrum' ? 'Git Flow' : 'GitHub Flow'}** branching model:

#### Branch Types

**Main Branches:**
- \`main\` (or \`master\`) - Production-ready code
- \`develop\` - Integration branch for features

**Supporting Branches:**
- \`feature/*\` - New features
- \`bugfix/*\` - Bug fixes
- \`hotfix/*\` - Urgent production fixes
- \`release/*\` - Release preparation

#### Branch Naming Convention

\`\`\`
feature/[ticket-id]-short-description
bugfix/[ticket-id]-short-description
hotfix/[ticket-id]-short-description
release/v[version-number]
\`\`\`

**Examples:**
\`\`\`
feature/USER-123-add-login-page
bugfix/BUG-456-fix-memory-leak
hotfix/HOTFIX-789-security-patch
release/v1.2.0
\`\`\`

### Git Workflow Steps

#### 1. Starting New Work

\`\`\`bash
# Update your local repository
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/USER-123-add-login-page

# Or create a bugfix branch
git checkout -b bugfix/BUG-456-fix-memory-leak
\`\`\`

#### 2. Making Changes

\`\`\`bash
# Make your changes
# ...

# Check status
git status

# Stage changes
git add .
# or stage specific files
git add path/to/file

# Commit with meaningful message
git commit -m "feat: add login page with email validation"
\`\`\`

#### 3. Keeping Branch Updated

\`\`\`bash
# Regularly sync with develop
git checkout develop
git pull origin develop

# Return to your feature branch
git checkout feature/USER-123-add-login-page

# Rebase or merge
git rebase develop
# or
git merge develop

# Resolve conflicts if any
# ...

# Continue rebase if needed
git rebase --continue
\`\`\`

#### 4. Pushing Changes

\`\`\`bash
# Push to remote
git push origin feature/USER-123-add-login-page

# If you rebased, you might need force push (use with caution)
git push origin feature/USER-123-add-login-page --force-with-lease
\`\`\`

#### 5. Creating Pull Request

1. Go to repository on GitHub/GitLab/Bitbucket
2. Create Pull Request from your branch to \`develop\`
3. Fill in PR template
4. Add reviewers
5. Link related issues

### Commit Message Convention

We follow **Conventional Commits** specification:

#### Format

\`\`\`
<type>(<scope>): <subject>

<body>

<footer>
\`\`\`

#### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, semicolons, etc.)
- **refactor:** Code refactoring
- **perf:** Performance improvements
- **test:** Adding or updating tests
- **chore:** Maintenance tasks, dependency updates
- **ci:** CI/CD changes
- **build:** Build system changes

#### Examples

\`\`\`bash
# Simple commit
git commit -m "feat: add user authentication"

# With scope
git commit -m "fix(api): handle null response from user service"

# With body and footer
git commit -m "feat(auth): implement JWT authentication

- Add JWT token generation
- Implement token validation middleware
- Add refresh token support

Closes #123"

# Breaking change
git commit -m "feat!: redesign API response format

BREAKING CHANGE: API responses now use a different structure"
\`\`\`

#### Commit Message Guidelines

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Reference issues and pull requests when relevant
- Include "BREAKING CHANGE:" in footer for breaking changes

### Pull Request Process

#### Creating a Pull Request

**PR Title:**
Follow the same convention as commit messages:
\`\`\`
feat: add user authentication
fix: resolve memory leak in data processing
\`\`\`

**PR Description Template:**

\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Closes #123
Related to #456

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
\`\`\`

#### Code Review Process

**For Authors:**
1. Ensure all checks pass (tests, linting)
2. Self-review your changes
3. Add description and context
4. Respond to review comments promptly
5. Request re-review after changes

**For Reviewers:**
1. Review within 24 hours
2. Check code logic and correctness
3. Verify tests are adequate
4. Ensure code follows standards
5. Be constructive and respectful
6. Approve when satisfied

#### Review Guidelines

**What to Look For:**
- [ ] Code correctness and logic
- [ ] Security vulnerabilities
- [ ] Performance implications
- [ ] Test coverage
- [ ] Error handling
- [ ] Code readability
- [ ] Documentation
- [ ] Breaking changes

**Review Comments:**

\`\`\`markdown
# Good review comments

## Suggestion
Consider using a Set instead of Array for better lookup performance

## Question  
Why did we choose this approach over X?

## Blocker
This change introduces a security vulnerability

## Nitpick
Minor style suggestion (not blocking)

## Praise
Great solution! This is much cleaner than before
\`\`\`

#### Merging Strategy

**Merge Methods:**

1. **Squash and Merge** (Recommended for features)
   - Combines all commits into one
   - Keeps history clean
   - Use for feature branches

2. **Rebase and Merge**
   - Maintains individual commits
   - Linear history
   - Use when commit history is important

3. **Merge Commit**
   - Creates merge commit
   - Preserves full history
   - Use for release branches

**Before Merging:**
- [ ] All required approvals received
- [ ] All CI checks passing
- [ ] Branch is up-to-date with target
- [ ] Conflicts resolved
- [ ] Final testing completed

### Common Git Commands

#### Useful Commands

\`\`\`bash
# View commit history
git log --oneline --graph --all

# View changes
git diff
git diff --staged

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Discard local changes
git checkout -- <file>
git restore <file>

# Stash changes
git stash
git stash list
git stash pop
git stash apply

# View remote branches
git branch -r

# Delete local branch
git branch -d feature/branch-name

# Delete remote branch
git push origin --delete feature/branch-name

# Amend last commit
git commit --amend

# Cherry-pick a commit
git cherry-pick <commit-hash>

# Interactive rebase (clean up commits)
git rebase -i HEAD~3
\`\`\`

#### Resolving Conflicts

\`\`\`bash
# When you encounter conflicts during merge/rebase

# 1. View conflicted files
git status

# 2. Open files and resolve conflicts
# Look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Incoming changes
# >>>>>>> branch-name

# 3. After resolving, stage the files
git add resolved-file.ts

# 4. Continue the merge/rebase
git rebase --continue
# or
git merge --continue

# If you want to abort
git rebase --abort
# or
git merge --abort
\`\`\`

### Git Hooks

${data.useLinter || data.useFormatter ? `#### Pre-commit Hook

We use pre-commit hooks to ensure code quality:

\`\`\`bash
# Install husky (if using Node.js)
npm install --save-dev husky

# Setup pre-commit hook
npx husky install
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "npm run format:check"
npx husky add .husky/pre-commit "npm test"
\`\`\`

**Pre-commit checks:**
${data.useLinter ? '- Run linter\n' : ''}${data.useFormatter ? '- Check code formatting\n' : ''}${data.requireUnitTests ? '- Run unit tests\n' : ''}- Validate commit message
` : ''}
#### Commit Message Hook

\`\`\`bash
# Install commitlint
npm install --save-dev @commitlint/{cli,config-conventional}

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
\`\`\`

### Release Process

#### Creating a Release

\`\`\`bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Update version number
# Update package.json, version files, changelog, etc.

# 3. Commit version bump
git commit -am "chore: bump version to 1.2.0"

# 4. Merge to main
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin main --tags

# 5. Merge back to develop
git checkout develop
git merge --no-ff release/v1.2.0
git push origin develop

# 6. Delete release branch
git branch -d release/v1.2.0
\`\`\`

#### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/) (SemVer):

**Version Format:** \`MAJOR.MINOR.PATCH\`

- **MAJOR:** Breaking changes
- **MINOR:** New features (backwards compatible)
- **PATCH:** Bug fixes (backwards compatible)

**Examples:**
- \`1.0.0\` → \`1.0.1\` (bug fix)
- \`1.0.1\` → \`1.1.0\` (new feature)
- \`1.1.0\` → \`2.0.0\` (breaking change)

### Hotfix Process

\`\`\`bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/v1.2.1-critical-security-fix

# 2. Make the fix
# ... make changes ...

# 3. Commit the fix
git commit -am "fix: patch critical security vulnerability"

# 4. Merge to main
git checkout main
git merge --no-ff hotfix/v1.2.1-critical-security-fix
git tag -a v1.2.1 -m "Hotfix version 1.2.1"
git push origin main --tags

# 5. Merge to develop
git checkout develop
git merge --no-ff hotfix/v1.2.1-critical-security-fix
git push origin develop

# 6. Delete hotfix branch
git branch -d hotfix/v1.2.1-critical-security-fix
\`\`\`

### Best Practices

**Do:**
✅ Commit early and often
✅ Write clear commit messages
✅ Keep commits focused and atomic
✅ Pull before starting new work
✅ Review your own code first
✅ Keep branches short-lived
✅ Delete merged branches

**Don't:**
❌ Commit directly to main/develop
❌ Commit sensitive information
❌ Commit generated files
❌ Make huge commits
❌ Force push to shared branches
❌ Leave branches unmerged for long periods

---
`;
}

