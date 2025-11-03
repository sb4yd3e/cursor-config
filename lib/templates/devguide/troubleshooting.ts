import { ProjectFormData } from '@/types';

export function generateTroubleshooting(data: ProjectFormData): string {
  const hasNode = data.technologyStack.languages.includes('JavaScript') || 
                  data.technologyStack.languages.includes('TypeScript');
  const hasPython = data.technologyStack.languages.includes('Python');
  const hasDocker = data.technologyStack.tools.includes('Docker');
  const usesDatabase = data.technologyStack.databases.length > 0;

  return `## Troubleshooting

### Getting Help

If you encounter issues not covered in this guide:

1. **Check existing issues** in the project repository
2. **Search documentation** for similar problems
3. **Ask the team** in your communication channel
4. **Create a new issue** with detailed information

When reporting issues, include:
- Error messages (full stack trace)
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, versions, etc.)
- Relevant logs

### Common Issues

${hasNode ? `#### Node.js / npm Issues

**Issue: \`npm install\` fails with permission errors**

\`\`\`bash
# Solution 1: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Solution 2: Use npx instead
npx create-next-app@latest
\`\`\`

**Issue: "Cannot find module" errors**

\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache if problem persists
npm cache clean --force
npm install
\`\`\`

**Issue: Port already in use (EADDRINUSE)**

\`\`\`bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or kill all node processes
killall node
\`\`\`

**Issue: Module version mismatch**

\`\`\`bash
# Rebuild native modules
npm rebuild

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Issue: Out of memory errors**

\`\`\`bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Or add to package.json scripts
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
}
\`\`\`

` : ''}${hasPython ? `#### Python Issues

**Issue: Package installation fails**

\`\`\`bash
# Upgrade pip
pip install --upgrade pip

# Install with verbose output
pip install -r requirements.txt --verbose

# Install without cache
pip install --no-cache-dir -r requirements.txt
\`\`\`

**Issue: Virtual environment not activating**

\`\`\`bash
# Recreate virtual environment
rm -rf venv
python -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate

# Activate (Windows)
.\\venv\\Scripts\\activate
\`\`\`

**Issue: "ModuleNotFoundError"**

\`\`\`bash
# Ensure virtual environment is activated
source venv/bin/activate

# Verify packages installed
pip list

# Reinstall package
pip install package-name
\`\`\`

**Issue: Different Python version**

\`\`\`bash
# Create venv with specific Python version
python3.9 -m venv venv

# Or use pyenv
pyenv install 3.9.0
pyenv local 3.9.0
\`\`\`

` : ''}${usesDatabase ? `#### Database Issues

**Issue: Cannot connect to database**

**Checklist:**
- [ ] Database server is running
- [ ] Connection string is correct
- [ ] Credentials are valid
- [ ] Network/firewall allows connection
- [ ] Database exists

\`\`\`bash
# Test database connection (PostgreSQL)
psql -h localhost -U username -d database_name

# Check if database is running
${hasDocker ? 'docker ps | grep postgres' : 'ps aux | grep postgres'}

# Restart database
${hasDocker ? 'docker-compose restart database' : 'sudo systemctl restart postgresql'}
\`\`\`

**Issue: Migration fails**

\`\`\`bash
# Check migration status
npm run migrate:status

# Rollback last migration
npm run migrate:rollback

# Reset database (⚠️ DESTRUCTIVE - dev only)
npm run db:reset

# Run migrations with verbose output
npm run migrate -- --verbose
\`\`\`

**Issue: "Too many connections"**

\`\`\`sql
-- Check current connections
SELECT count(*) FROM pg_stat_activity;

-- Kill idle connections
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle' AND state_change < NOW() - INTERVAL '10 minutes';
\`\`\`

**Issue: Slow queries**

\`\`\`sql
-- Enable query logging (PostgreSQL)
ALTER DATABASE database_name SET log_min_duration_statement = 1000;

-- Check slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Check missing indexes
-- Use EXPLAIN ANALYZE on slow queries
\`\`\`

` : ''}${hasDocker ? `#### Docker Issues

**Issue: Docker build fails**

\`\`\`bash
# Build with no cache
docker build --no-cache -t app:latest .

# Build with verbose output
docker build --progress=plain -t app:latest .

# Check Docker daemon
docker info
\`\`\`

**Issue: Container won't start**

\`\`\`bash
# Check container logs
docker logs container-name

# Check container status
docker ps -a

# Inspect container
docker inspect container-name

# Try running interactively
docker run -it app:latest /bin/bash
\`\`\`

**Issue: "Port is already allocated"**

\`\`\`bash
# Stop all containers using the port
docker ps | grep 3000
docker stop container-id

# Or change port mapping
docker run -p 3001:3000 app:latest
\`\`\`

**Issue: Disk space issues**

\`\`\`bash
# Check Docker disk usage
docker system df

# Clean up
docker system prune -a

# Remove unused volumes
docker volume prune

# Remove specific images
docker rmi image-name
\`\`\`

**Issue: Container can't access host services**

\`\`\`bash
# Use host.docker.internal instead of localhost
DATABASE_URL=postgresql://host.docker.internal:5432/db

# Or use host network mode
docker run --network host app:latest
\`\`\`

` : ''}#### Build Issues

**Issue: Build fails with out of memory**

\`\`\`bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

# Or configure in next.config.js
module.exports = {
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}
\`\`\`

**Issue: Build succeeds but runtime errors**

\`\`\`bash
# Check environment variables
printenv | grep NODE_ENV

# Verify build output
ls -la .next/
${hasNode ? 'cat .next/BUILD_ID' : ''}

# Clear build cache
rm -rf .next
npm run build
\`\`\`

#### TypeScript Issues

${data.useTypeScript ? `**Issue: Type errors in node_modules**

\`\`\`bash
# Skip lib check in tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
\`\`\`

**Issue: "Cannot find module" with correct imports**

\`\`\`bash
# Restart TypeScript server in VS Code
# Command Palette > TypeScript: Restart TS Server

# Check path aliases in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`

**Issue: Type checking very slow**

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", ".next", "out"]
}
\`\`\`
` : ''}
#### Testing Issues

**Issue: Tests fail in CI but pass locally**

**Common causes:**
- Environment differences
- Timing issues
- Missing environment variables
- Different Node/Python versions
- Race conditions

\`\`\`bash
# Run tests with same conditions as CI
NODE_ENV=test npm test

# Check Node version
node --version

# Increase test timeout
jest.setTimeout(10000);
\`\`\`

**Issue: "Jest has detected opened handles"**

\`\`\`typescript
// Close all connections in afterAll
afterAll(async () => {
  await db.destroy();
  await redisClient.quit();
});
\`\`\`

**Issue: Snapshot tests failing**

\`\`\`bash
# Update snapshots
npm test -- -u

# Update specific snapshot
npm test ComponentName -- -u
\`\`\`

#### Environment Issues

**Issue: Environment variables not loading**

\`\`\`bash
# Check .env file exists
ls -la .env

# Verify dotenv is loaded (Node.js)
require('dotenv').config();
console.log(process.env.VAR_NAME);

# Check environment
printenv

# Restart application after .env changes
\`\`\`

**Issue: CORS errors**

\`\`\`typescript
// Configure CORS properly
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true,
}));
\`\`\`

#### Performance Issues

**Issue: Application is slow**

**Debug steps:**

1. **Check Network Tab** in browser DevTools
   - Look for slow API calls
   - Check for waterfall requests
   - Verify resource sizes

2. **Profile the application**
   \`\`\`bash
   # Node.js profiling
   node --prof app.js
   node --prof-process isolate-*.log
   
   # React DevTools Profiler
   # Use Profiler tab in React DevTools
   \`\`\`

3. **Check database queries**
   - Enable query logging
   - Use EXPLAIN ANALYZE
   - Add indexes if needed

4. **Monitor resources**
   \`\`\`bash
   # Check CPU and memory
   top
   htop
   
   # Node.js memory usage
   node --inspect app.js
   # Open chrome://inspect
   \`\`\`

#### Deployment Issues

**Issue: Deploy succeeds but app doesn't work**

**Checklist:**
- [ ] Check application logs
- [ ] Verify environment variables
- [ ] Check database connection
- [ ] Verify build artifacts deployed
- [ ] Check health endpoint
- [ ] Review recent changes

\`\`\`bash
# Check logs
${hasDocker ? 'docker logs container-name' : 'tail -f /var/log/app.log'}

# Verify environment
${hasDocker ? 'docker exec container-name env' : 'printenv'}

# Test health endpoint
curl https://app.example.com/health
\`\`\`

**Issue: SSL/Certificate errors**

\`\`\`bash
# Check certificate expiry
openssl s_client -connect example.com:443 -servername example.com

# Verify certificate chain
curl -vI https://example.com

# Renew Let's Encrypt certificate
certbot renew
\`\`\`

### Debugging Tips

#### Enable Debug Logging

\`\`\`bash
# Enable debug mode
DEBUG=* npm start

# Enable specific namespace
DEBUG=app:* npm start

# Log levels
LOG_LEVEL=debug npm start
\`\`\`

#### Using Debugger

${hasNode ? `**Node.js Debugger:**

\`\`\`bash
# Start with inspect flag
node --inspect server.js

# Or use VS Code launch configuration
{
  "type": "node",
  "request": "launch",
  "name": "Debug Application",
  "program": "\${workspaceFolder}/server.js"
}
\`\`\`

**Chrome DevTools:**
1. Start app with --inspect
2. Open chrome://inspect
3. Click "inspect" on your app
4. Set breakpoints and debug
` : ''}
#### Check Logs

\`\`\`bash
# Application logs
tail -f logs/application.log

# Error logs
tail -f logs/error.log

# System logs
tail -f /var/log/syslog

${hasDocker ? `# Docker logs
docker logs -f container-name --tail 100
` : ''}\`\`\`

### Getting More Help

#### Resources

- **Project Repository:** ${data.repositoryUrl || '[Repository URL]'}
- **Documentation:** [Link to docs]
- **Team Chat:** [Slack/Discord/Teams channel]
- **Stack Overflow:** [Tag your questions appropriately]

#### Creating a Bug Report

When creating a bug report, include:

\`\`\`markdown
## Bug Description
[Clear description of the issue]

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: [e.g., macOS 13.0]
- Node Version: [e.g., 18.17.0]
- Browser: [e.g., Chrome 115]
- Other relevant info

## Error Messages
\`\`\`
[Full error message or stack trace]
\`\`\`

## Screenshots
[If applicable]

## Additional Context
[Any other relevant information]
\`\`\`

### Performance Monitoring

Set up monitoring to catch issues early:

- Application performance monitoring (APM)
- Error tracking (Sentry, Rollbar)
- Log aggregation (ELK, Splunk)
- Uptime monitoring
- Resource usage alerts

### Maintenance

Regular maintenance tasks:

- [ ] Update dependencies monthly
- [ ] Review and fix security vulnerabilities
- [ ] Monitor disk space and clean up logs
- [ ] Review and optimize slow queries
- [ ] Check SSL certificate expiry
- [ ] Backup databases regularly
- [ ] Review error logs weekly
- [ ] Performance audits quarterly

---

**Last Updated:** ${new Date().toISOString().split('T')[0]}

For additional help, contact the development team or refer to the team documentation.
`;
}

