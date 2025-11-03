import { ProjectFormData } from '@/types';

export function generateDeployment(data: ProjectFormData): string {
  const hasDocker = data.technologyStack.tools.includes('Docker');
  const hasK8s = data.technologyStack.tools.includes('Kubernetes');
  
  return `## Deployment Guide

### Deployment Overview

${data.deploymentEnvironments.length > 0 ? `This project uses the following environments:

${data.deploymentEnvironments.map(env => `- **${env}**`).join('\n')}
` : `This project supports multiple deployment environments:

- **Development:** Local development environment
- **Staging:** Pre-production testing environment
- **Production:** Live production environment
`}
### Deployment Strategy

**Deployment Method:** ${data.useCICD ? 'Automated CI/CD' : 'Manual deployment'}

**Key Principles:**
- Zero-downtime deployments
- Easy rollback capability
- Environment parity
- Automated testing before deployment
- Monitoring and alerting

### Pre-Deployment Checklist

Before deploying to any environment:

- [ ] All tests passing (unit, integration, E2E)
- [ ] Code reviewed and approved
- [ ] Database migrations prepared (if needed)
- [ ] Environment variables configured
- [ ] Dependencies updated
- [ ] Security scan completed
- [ ] Performance tested
- [ ] Documentation updated
- [ ] Rollback plan prepared

### Environment Configuration

#### Environment Variables

Each environment requires specific configuration:

**Development:**
\`\`\`env
NODE_ENV=development
API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://localhost:5432/dev_db
LOG_LEVEL=debug
\`\`\`

**Staging:**
\`\`\`env
NODE_ENV=staging
API_URL=https://staging-api.example.com/api
DATABASE_URL=postgresql://staging-db.example.com:5432/staging_db
LOG_LEVEL=info
\`\`\`

**Production:**
\`\`\`env
NODE_ENV=production
API_URL=https://api.example.com/api
DATABASE_URL=postgresql://prod-db.example.com:5432/prod_db
LOG_LEVEL=warn
\`\`\`

#### Managing Secrets

**Never commit secrets to version control!**

Use environment-specific secret management:
${data.technologyStack.tools.includes('AWS') ? '- AWS Secrets Manager\n' : ''}${data.technologyStack.tools.includes('Google Cloud') ? '- Google Cloud Secret Manager\n' : ''}${data.technologyStack.tools.includes('Azure') ? '- Azure Key Vault\n' : ''}- Environment variables in deployment platform
- .env files (gitignored) for local development

${hasDocker ? `### Docker Deployment

#### Building Docker Image

\`\`\`bash
# Build image
docker build -t ${data.projectName.toLowerCase().replace(/\s+/g, '-')}:latest .

# Tag for registry
docker tag ${data.projectName.toLowerCase().replace(/\s+/g, '-')}:latest registry.example.com/${data.projectName.toLowerCase().replace(/\s+/g, '-')}:v1.0.0

# Push to registry
docker push registry.example.com/${data.projectName.toLowerCase().replace(/\s+/g, '-')}:v1.0.0
\`\`\`

#### Docker Compose Production

\`\`\`yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    image: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}:latest
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  ${data.technologyStack.databases.length > 0 ? `database:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=\${DB_NAME}
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
    restart: always
` : ''}
volumes:
  postgres_data:
\`\`\`

#### Running with Docker

\`\`\`bash
# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Update to new version
docker-compose pull
docker-compose up -d
\`\`\`

` : ''}${hasK8s ? `### Kubernetes Deployment

#### Kubernetes Manifests

**Deployment:**

\`\`\`yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}
  labels:
    app: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}
  template:
    metadata:
      labels:
        app: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}
    spec:
      containers:
      - name: app
        image: registry.example.com/${data.projectName.toLowerCase().replace(/\s+/g, '-')}:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
\`\`\`

**Service:**

\`\`\`yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}-service
spec:
  selector:
    app: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
\`\`\`

**Ingress:**

\`\`\`yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - example.com
    secretName: example-tls
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}-service
            port:
              number: 80
\`\`\`

#### Deploying to Kubernetes

\`\`\`bash
# Apply configurations
kubectl apply -f k8s/

# Check deployment status
kubectl rollout status deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')}

# View pods
kubectl get pods

# View logs
kubectl logs -f deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')}

# Scale deployment
kubectl scale deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')} --replicas=5
\`\`\`

` : ''}${data.useCICD ? `### CI/CD Pipeline

#### ${data.cicdTool || 'CI/CD'} Configuration

${data.cicdTool?.includes('GitHub') || !data.cicdTool ? `**GitHub Actions:**

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build application
        run: npm run build
      
      ${hasDocker ? `- name: Build Docker image
        run: docker build -t \${{ secrets.REGISTRY }}/app:\${{ github.sha }} .
      
      - name: Push to registry
        run: docker push \${{ secrets.REGISTRY }}/app:\${{ github.sha }}
` : ''}
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to production
        run: |
          # Add your deployment commands here
          ${hasK8s ? 'kubectl set image deployment/app app=${{ secrets.REGISTRY }}/app:${{ github.sha }}' : ''}
\`\`\`
` : ''}
#### Pipeline Stages

1. **Build:** Compile and package application
2. **Test:** Run automated tests
3. **Security Scan:** Check for vulnerabilities
4. **Deploy to Staging:** Automatic deployment
5. **Smoke Tests:** Run critical tests on staging
6. **Deploy to Production:** Manual approval required
7. **Health Check:** Verify production deployment

#### Deployment Approval

Production deployments require manual approval:

1. Review deployment checklist
2. Check staging environment
3. Approve deployment in CI/CD dashboard
4. Monitor deployment progress
5. Verify production health

` : ''}### Database Migrations

#### Running Migrations

**Development:**
\`\`\`bash
npm run migrate
# or
npm run db:migrate
\`\`\`

**Production:**
\`\`\`bash
# Run migrations before deploying new code
npm run migrate:prod

# Or as part of deployment script
./scripts/deploy.sh --migrate
\`\`\`

#### Migration Best Practices

- Always test migrations in staging first
- Create reversible migrations when possible
- Backup database before running migrations
- Run migrations in maintenance window for major changes
- Monitor migration progress
- Have rollback plan ready

#### Example Migration Script

\`\`\`bash
#!/bin/bash
# scripts/deploy.sh

set -e

echo "Starting deployment..."

# 1. Backup database
echo "Creating database backup..."
./scripts/backup-db.sh

# 2. Run migrations
echo "Running database migrations..."
npm run migrate:prod

# 3. Deploy new code
echo "Deploying new version..."
${hasK8s ? 'kubectl set image deployment/app app=registry.example.com/app:$VERSION' : hasDocker ? 'docker-compose up -d' : './deploy-app.sh'}

# 4. Health check
echo "Running health checks..."
./scripts/health-check.sh

echo "Deployment completed successfully!"
\`\`\`

### Monitoring Deployment

#### Health Checks

Implement health check endpoints:

\`\`\`typescript
// /health endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
  
  res.json(health);
});

// /ready endpoint (checks dependencies)
app.get('/ready', async (req, res) => {
  try {
    // Check database
    await db.raw('SELECT 1');
    
    // Check other dependencies
    // ...
    
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});
\`\`\`

#### Post-Deployment Verification

After deployment, verify:

- [ ] Application is responding
- [ ] Health check passes
- [ ] Database migrations completed
- [ ] No errors in logs
- [ ] Key features working
- [ ] Performance metrics normal
- [ ] SSL certificates valid

### Rollback Procedures

#### Quick Rollback

${hasK8s ? `**Kubernetes:**
\`\`\`bash
# Rollback to previous version
kubectl rollout undo deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')}

# Rollback to specific revision
kubectl rollout undo deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')} --to-revision=2

# Check rollout history
kubectl rollout history deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`
` : hasDocker ? `**Docker:**
\`\`\`bash
# Revert to previous image
docker-compose -f docker-compose.prod.yml down
docker pull registry.example.com/app:previous-version
docker-compose -f docker-compose.prod.yml up -d
\`\`\`
` : `\`\`\`bash
# Revert to previous version
./scripts/rollback.sh
\`\`\`
`}
#### Database Rollback

\`\`\`bash
# Restore from backup
./scripts/restore-db.sh backup-file.sql

# Rollback migrations
npm run migrate:rollback
\`\`\`

#### When to Rollback

Rollback immediately if:
- Critical functionality broken
- Data corruption detected
- Security vulnerability introduced
- Performance significantly degraded
- Error rate spike

### Scaling

#### Horizontal Scaling

${hasK8s ? `**Kubernetes Auto-scaling:**

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${data.projectName.toLowerCase().replace(/\s+/g, '-')}
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`
` : `**Manual Scaling:**

\`\`\`bash
# Scale up
${hasDocker ? 'docker-compose up -d --scale app=5' : '# Increase instance count in your platform'}

# Scale down
${hasDocker ? 'docker-compose up -d --scale app=2' : '# Decrease instance count in your platform'}
\`\`\`
`}
#### Load Balancing

Ensure load is distributed across instances:
- Use health checks
- Implement session stickiness if needed
- Monitor instance health
- Automatic failover

### Maintenance Mode

\`\`\`bash
# Enable maintenance mode
./scripts/maintenance.sh on

# Perform maintenance
# ...

# Disable maintenance mode
./scripts/maintenance.sh off
\`\`\`

### Deployment Environments

${data.deploymentEnvironments.map(env => `#### ${env}

**URL:** https://${env.toLowerCase()}.example.com

**Purpose:** ${env === 'Production' || env === 'production' ? 'Live production environment' : env === 'Staging' || env === 'staging' ? 'Pre-production testing' : env === 'Development' || env === 'development' ? 'Development testing' : 'Testing and validation'}

**Deployment:** ${env === 'Production' || env === 'production' ? 'Manual approval required' : 'Automatic on push'}

**Access:** ${env === 'Production' || env === 'production' ? 'Public' : 'Restricted'}
`).join('\n')}

### Deployment Logs

Access deployment logs:

\`\`\`bash
${hasK8s ? `# Kubernetes logs
kubectl logs -f deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')}
kubectl logs --previous deployment/${data.projectName.toLowerCase().replace(/\s+/g, '-')}
` : hasDocker ? `# Docker logs
docker-compose logs -f
docker logs container-name
` : `# Application logs
tail -f /var/log/app/application.log
`}\`\`\`

### Security Considerations

- Use HTTPS/TLS for all connections
- Implement rate limiting
- Enable security headers
- Regular security scans
- Keep dependencies updated
- Implement proper authentication
- Use secrets management
- Enable audit logging

---
`;
}

