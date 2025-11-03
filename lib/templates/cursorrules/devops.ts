import { ProjectFormData } from '@/types';

export function generateDevOpsRules(data: ProjectFormData): string {
  return `# DevOps Cursor AI Rules

## Project: ${data.projectName}
${data.projectDescription ? `Description: ${data.projectDescription}\n` : ''}

## DevOps Philosophy

### Core Principles
- Automate everything possible
- Infrastructure as Code (IaC)
- Continuous Integration/Continuous Deployment
- Monitoring and observability
- Security first approach
- Treat infrastructure like software
- Version control everything

### DevOps Culture
- Collaborate across teams
- Share responsibility
- Learn from failures
- Iterate and improve
- Document processes
- Embrace change

## Infrastructure as Code

### IaC Best Practices
- Version control all infrastructure code
- Use declarative configurations
- Implement modular designs
- Keep code DRY
- Use variables and parameters
- Document infrastructure decisions
- Test infrastructure changes

### Terraform (if used)
- Use remote state storage
- Implement state locking
- Use workspaces for environments
- Modularize with modules
- Use terraform fmt and validate
- Implement proper dependency management
- Use data sources appropriately
- Document terraform versions

### CloudFormation/ARM/Other
- Use stack outputs
- Implement nested stacks
- Use parameters for flexibility
- Implement proper error handling
- Version templates
- Use change sets

### Configuration Management
- Use Ansible/Chef/Puppet appropriately
- Keep playbooks/recipes idempotent
- Use roles/cookbooks for organization
- Test configuration changes
- Document configuration
- Implement proper secret management

## Containerization

### Docker Best Practices
- Use official base images
- Minimize image size
- Use multi-stage builds
- Don't run as root
- Use specific image tags
- Clean up in same layer
- Use .dockerignore
- Scan images for vulnerabilities
- Document Dockerfile

### Container Security
- Scan for vulnerabilities
- Use minimal base images
- Don't store secrets in images
- Implement resource limits
- Use read-only filesystems when possible
- Update base images regularly
- Sign images

### Docker Compose
- Use for local development
- Define service dependencies
- Use environment files
- Implement proper networking
- Use volumes appropriately
- Document compose setup

## Kubernetes

### K8s Best Practices
- Use namespaces for isolation
- Implement resource requests and limits
- Use liveness and readiness probes
- Implement proper RBAC
- Use ConfigMaps and Secrets
- Implement proper labels and selectors
- Use StatefulSets for stateful apps
- Implement proper networking policies

### Deployment Strategies
- Use rolling updates
- Implement blue-green deployments
- Use canary deployments
- Implement proper health checks
- Use horizontal pod autoscaling
- Test deployments in staging

### Helm Charts (if used)
- Create reusable charts
- Use values files for configuration
- Implement proper templating
- Version charts properly
- Document chart usage
- Test chart installations

### K8s Security
- Implement network policies
- Use Pod Security Policies
- Implement RBAC properly
- Scan for vulnerabilities
- Use service meshes (Istio/Linkerd)
- Implement secrets management
- Audit cluster configurations

## CI/CD Pipelines

${data.useCICD ? `### ${data.cicdTool || 'CI/CD'} Configuration
- Define pipelines as code
- Implement automated testing
- Use caching effectively
- Implement parallel execution
- Use proper environment variables
- Implement manual approval gates
- Document pipeline stages

` : ''}### Pipeline Best Practices
- Keep pipelines fast
- Fail fast on errors
- Implement proper error handling
- Use pipeline templates/reusables
- Cache dependencies
- Implement artifact management
- Log pipeline execution
- Secure pipeline secrets

### Build Process
- Automate builds
- Use consistent build environments
- Implement versioning
- Tag builds properly
- Store artifacts securely
- Implement build caching
- Run security scans

### Testing in Pipeline
- Run unit tests
- Run integration tests
- Implement security scanning
- Run linting and formatting checks
- Test infrastructure changes
- Implement smoke tests
- Generate test reports

### Deployment Automation
- Automate deployments
- Implement environment promotion
- Use deployment strategies
- Implement rollback mechanisms
- Verify deployments
- Implement blue-green/canary
- Document deployment process

## Monitoring & Observability

### Monitoring Strategy
- Monitor all layers (infrastructure, application, business)
- Implement centralized logging
- Use distributed tracing
- Monitor key metrics (RED/USE)
- Set up dashboards
- Implement proper alerting
- Document monitoring setup

### Logging
- Implement structured logging
- Use centralized log aggregation (ELK, Splunk)
- Implement log retention policies
- Don't log sensitive information
- Use appropriate log levels
- Include context in logs
- Implement log rotation

### Metrics Collection
- Use Prometheus/Grafana or similar
- Collect system metrics
- Collect application metrics
- Collect business metrics
- Implement custom metrics
- Use proper metric types
- Document metrics

### Distributed Tracing
- Implement tracing (Jaeger, Zipkin)
- Trace critical paths
- Include context in traces
- Analyze trace data
- Set up trace sampling
- Document tracing setup

### Alerting
- Set meaningful thresholds
- Implement alert escalation
- Avoid alert fatigue
- Document alert runbooks
- Test alerting system
- Implement on-call rotation
- Review and tune alerts

## Security

### Security Best Practices
- Implement defense in depth
- Follow least privilege principle
- Implement network segmentation
- Use encryption everywhere
- Implement proper authentication
- Audit security configurations
- Regular security scanning

### Secret Management
- Never commit secrets
- Use secret management tools (Vault, AWS Secrets Manager)
- Rotate secrets regularly
- Encrypt secrets at rest
- Implement proper access controls
- Audit secret access
- Document secret management

### Network Security
- Implement firewalls
- Use security groups properly
- Implement VPCs/VNets
- Use private subnets
- Implement bastion hosts
- Use VPN for access
- Monitor network traffic

### Compliance & Auditing
- Implement audit logging
- Follow compliance requirements
- Document security policies
- Implement access controls
- Regular security audits
- Track changes
- Implement compliance scanning

### Vulnerability Management
- Regular security scanning
- Patch systems promptly
- Track CVEs
- Implement vulnerability reporting
- Prioritize critical issues
- Document remediation

## Cloud Platforms

### AWS Best Practices (if used)
- Use IAM roles, not keys
- Implement least privilege
- Use CloudFormation/Terraform
- Enable CloudTrail
- Use CloudWatch for monitoring
- Implement proper tagging
- Use multiple availability zones
- Enable MFA

### GCP Best Practices (if used)
- Use service accounts
- Implement IAM properly
- Use Deployment Manager/Terraform
- Enable Cloud Logging
- Use Cloud Monitoring
- Implement proper labeling
- Use multiple zones

### Azure Best Practices (if used)
- Use managed identities
- Implement RBAC
- Use ARM templates/Terraform
- Enable Azure Monitor
- Implement proper tagging
- Use availability zones
- Enable Azure AD

### Multi-Cloud Strategy
- Use cloud-agnostic tools
- Abstract cloud services
- Implement portable solutions
- Document cloud-specific features
- Test disaster recovery

## High Availability & Disaster Recovery

### HA Design
- Eliminate single points of failure
- Use load balancing
- Implement auto-scaling
- Use multiple availability zones
- Implement circuit breakers
- Design for failure
- Test failure scenarios

### Backup Strategy
- Automate backups
- Test backup restoration
- Implement backup retention
- Use cross-region backups
- Document backup procedures
- Monitor backup status
- Encrypt backups

### Disaster Recovery
- Document DR procedures
- Implement RPO/RTO
- Test DR regularly
- Use multiple regions
- Automate failover
- Document recovery steps
- Train team on DR

## Performance Optimization

### Infrastructure Performance
- Right-size resources
- Implement caching
- Use CDNs
- Optimize database queries
- Implement connection pooling
- Monitor resource usage
- Scale appropriately

### Cost Optimization
- Monitor cloud costs
- Right-size instances
- Use reserved instances
- Implement auto-scaling
- Remove unused resources
- Use spot/preemptible instances
- Implement cost alerts

## Automation

### Automation Principles
- Automate repetitive tasks
- Use scripts for common operations
- Implement self-service tools
- Document automation
- Test automation
- Handle errors gracefully
- Version control scripts

### Common Automations
- Automated deployments
- Automated backups
- Automated scaling
- Automated testing
- Automated monitoring
- Automated security scanning
- Automated certificate renewal

## Documentation

### Infrastructure Documentation
- Document architecture
- Create network diagrams
- Document deployment procedures
- Create runbooks
- Document disaster recovery
- Keep documentation current
- Use diagrams as code (PlantUML, Mermaid)

### Runbooks
- Document common procedures
- Include troubleshooting steps
- Document emergency procedures
- Include escalation paths
- Keep runbooks updated
- Test runbook procedures

## Team Practices

### GitOps
- Store configuration in Git
- Automate deployment from Git
- Use pull requests for changes
- Implement proper reviews
- Version everything
- Document GitOps workflow

### Collaboration
- Document decisions
- Share knowledge
- Conduct post-mortems
- Continuous improvement
- Cross-train team members
- Use communication tools

### On-Call
- Implement on-call rotation
- Document escalation procedures
- Provide proper tools
- Conduct incident reviews
- Learn from incidents
- Support on-call engineers

${data.deploymentEnvironments.length > 0 ? `## Environment Management

### Environments: ${data.deploymentEnvironments.join(', ')}
- Keep environments consistent
- Use IaC for all environments
- Implement proper promotion
- Test in lower environments
- Document environment differences
- Automate environment setup
` : ''}
## Testing

${data.requireUnitTests ? `### Infrastructure Testing
- Test IaC with unit tests
- Use terraform validate/plan
- Test Ansible playbooks
- Validate configurations
- Test deployment scripts
- Use ${data.testingFrameworks.join(', ')}

` : ''}### Integration Testing
- Test full deployment
- Test disaster recovery
- Test scaling
- Test monitoring and alerting
- Test backup and restore
- Chaos engineering

---
Generated with Cursor Config Generator
`;
}

