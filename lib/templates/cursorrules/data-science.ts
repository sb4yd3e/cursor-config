import { ProjectFormData } from '@/types';

export function generateDataScienceRules(data: ProjectFormData): string {
  return `# Data Science Cursor AI Rules

## Project: ${data.projectName}
${data.projectDescription ? `Description: ${data.projectDescription}\n` : ''}

## Data Science Principles

### Scientific Computing
- Write reproducible code
- Document all experiments
- Version control everything (code, data, models)
- Use consistent random seeds
- Track all hyperparameters
- Document data sources and versions

### Code Quality
- Write modular, reusable code
- Create well-structured notebooks
- Convert notebook code to modules for production
- Use proper error handling
- Write defensive code with assertions
- Document assumptions clearly

## Data Handling

### Data Loading & Processing
- Validate data integrity
- Handle missing data appropriately
- Document data transformations
- Use efficient data structures (pandas, numpy)
- Implement proper data versioning
- Track data lineage
- Use type hints for data structures

### Data Validation
- Check data types and ranges
- Validate distributions
- Check for data leakage
- Verify data completeness
- Document data quality issues
- Implement data quality tests

### Data Storage
- Use appropriate storage formats (Parquet, HDF5, CSV)
- Compress large datasets
- Implement efficient data loading
- Use data versioning tools (DVC)
- Backup critical datasets
- Document data schemas

### Feature Engineering
- Document feature creation logic
- Version feature definitions
- Validate feature distributions
- Check for feature leakage
- Implement feature stores when appropriate
- Track feature importance

## Model Development

### Experimentation
- Track all experiments (MLflow, Weights & Biases)
- Log hyperparameters and metrics
- Use consistent evaluation metrics
- Implement proper train/validation/test splits
- Use cross-validation appropriately
- Document experiment results

### Model Training
- Set random seeds for reproducibility
- Implement early stopping
- Save model checkpoints
- Monitor training metrics
- Implement proper validation
- Use appropriate batch sizes
- Log training configurations

### Model Evaluation
- Use multiple evaluation metrics
- Implement proper cross-validation
- Test on holdout sets
- Analyze model errors
- Check for bias and fairness
- Validate model assumptions
- Document evaluation criteria

### Model Selection
- Compare multiple models
- Use appropriate baselines
- Consider model complexity
- Balance accuracy and interpretability
- Document model selection criteria
- Perform statistical significance tests

## Machine Learning Best Practices

### Training Pipeline
- Automate data preprocessing
- Implement reproducible pipelines
- Use pipeline tools (scikit-learn Pipeline, Keras)
- Version control pipelines
- Test pipeline components
- Document pipeline stages

### Model Versioning
- Version models with metadata
- Track model lineage
- Store model artifacts properly
- Document model versions
- Implement model registry
- Track model performance over time

### Hyperparameter Tuning
- Use systematic search (Grid, Random, Bayesian)
- Document search spaces
- Track tuning experiments
- Use appropriate validation strategies
- Avoid overfitting to validation set
- Document optimal parameters

## Deep Learning (if applicable)

### Neural Network Design
- Start with simple architectures
- Document architecture decisions
- Use appropriate activation functions
- Implement proper initialization
- Use batch normalization when appropriate
- Implement dropout for regularization

### Training Deep Models
- Monitor loss curves
- Implement learning rate scheduling
- Use appropriate optimizers
- Implement gradient clipping
- Monitor gradient flow
- Use tensorboard or similar tools
- Implement proper checkpointing

### Transfer Learning
- Use pretrained models appropriately
- Fine-tune on domain data
- Freeze layers strategically
- Monitor for catastrophic forgetting
- Document transfer learning approach

## Code Organization

### Project Structure
\`\`\`
project/
├── data/
│   ├── raw/              # Original data
│   ├── processed/        # Processed data
│   └── external/         # External data sources
├── notebooks/            # Jupyter notebooks
│   ├── exploratory/      # EDA notebooks
│   └── experiments/      # Experiment notebooks
├── src/
│   ├── data/            # Data loading and processing
│   ├── features/        # Feature engineering
│   ├── models/          # Model definitions
│   ├── visualization/   # Plotting functions
│   └── utils/           # Utility functions
├── models/              # Trained models
├── reports/             # Generated reports
└── tests/               # Unit tests
\`\`\`

### Notebook Organization
- Use clear section headers
- Keep notebooks focused
- Extract reusable code to modules
- Clear outputs before committing
- Include markdown documentation
- Show key results inline
- Limit notebook length

### Module Organization
- Separate data, features, models
- Create clear interfaces
- Use configuration files
- Implement proper logging
- Write modular functions
- Follow DRY principle

## Testing

${data.requireUnitTests ? `### Unit Testing
- Test data processing functions
- Test feature engineering
- Test model training pipeline
- Test evaluation metrics
- Mock external dependencies
- Achieve ${data.minTestCoverage || 80}% coverage
- Use ${data.testingFrameworks.join(', ')}

` : ''}### Data Testing
- Test data loading
- Test data transformations
- Validate data distributions
- Test for data drift
- Implement data quality tests
- Use great_expectations or similar

### Model Testing
- Test model predictions
- Test model serialization
- Validate model outputs
- Test edge cases
- Implement smoke tests
- Test model performance

## Documentation

### Code Documentation
- Document all functions with docstrings
- Explain complex algorithms
- Document assumptions
- Include usage examples
- Document data requirements
- Use type hints

### Experiment Documentation
- Document experiment goals
- Record all hyperparameters
- Document results and insights
- Track experiment status
- Link to related experiments
- Document conclusions

### Model Documentation
- Document model architecture
- List input features
- Document preprocessing steps
- Explain model decisions
- Include performance metrics
- Document limitations

### Data Documentation
- Document data sources
- Explain data collection
- Document preprocessing steps
- List feature definitions
- Document data quality issues
- Include data dictionaries

## Reproducibility

### Environment Management
- Use virtual environments
- Pin all dependencies (requirements.txt)
- Document system requirements
- Use Docker for complex environments
- Version Python/R versions
- Document hardware requirements

### Experiment Tracking
- Use experiment tracking tools (MLflow, Weights & Biases)
- Log all hyperparameters
- Save model artifacts
- Track data versions
- Log evaluation metrics
- Save visualizations

### Version Control
- Version control code and notebooks
- Version control data (DVC, Git LFS)
- Commit regularly with clear messages
- Use branches for experiments
- Tag important versions
- Document in commit messages

## Performance Optimization

### Computational Efficiency
- Profile code for bottlenecks
- Use vectorized operations (numpy)
- Implement parallel processing
- Use appropriate data types
- Optimize memory usage
- Use GPU when beneficial

### Data Processing
- Use efficient data formats
- Implement data caching
- Use chunking for large datasets
- Optimize I/O operations
- Use lazy loading
- Implement data pipelines

### Model Optimization
- Optimize model inference
- Use model quantization
- Implement batch prediction
- Cache predictions when appropriate
- Use efficient model formats
- Optimize hyperparameters for speed

## Visualization

### Exploratory Analysis
- Visualize data distributions
- Create correlation plots
- Plot time series
- Show missing data patterns
- Visualize outliers
- Create informative plots

### Model Results
- Plot learning curves
- Visualize feature importance
- Create confusion matrices
- Plot ROC/PR curves
- Visualize predictions vs actuals
- Show model errors

### Visualization Best Practices
- Use appropriate chart types
- Label axes clearly
- Add titles and legends
- Use color effectively
- Make plots reproducible
- Save high-resolution figures

## Ethics & Bias

### Responsible AI
- Check for data bias
- Test for model fairness
- Document ethical considerations
- Consider privacy implications
- Implement responsible disclosure
- Monitor for unintended consequences

### Bias Detection
- Test on diverse data
- Check for demographic parity
- Analyze error distributions
- Test edge cases
- Document bias findings
- Implement bias mitigation

### Privacy
- Anonymize sensitive data
- Follow privacy regulations (GDPR)
- Implement data minimization
- Secure sensitive data
- Document data usage
- Implement proper access controls

## Deployment (ML Models)

### Model Serving
- Create model APIs
- Implement proper validation
- Handle errors gracefully
- Monitor model performance
- Implement versioning
- Use proper scaling

### Monitoring
- Track prediction distribution
- Monitor model performance
- Detect data drift
- Log predictions and features
- Set up alerts
- Track model latency

### Model Updates
- Implement A/B testing
- Use shadow deployment
- Implement rollback procedures
- Track model versions
- Document update procedures
- Test before deployment

${data.useCICD ? `## CI/CD for ML

### Automated Pipelines
- Automate model training
- Run automated tests
- Use ${data.cicdTool || 'CI/CD tool'}
- Implement data validation
- Automate model evaluation
- Deploy models automatically

### Continuous Training
- Implement retraining schedules
- Monitor training pipelines
- Validate new models
- Automate model comparison
- Implement approval workflows
` : ''}
## Security

### Data Security
- Encrypt sensitive data
- Implement access controls
- Audit data access
- Follow data regulations
- Secure model artifacts
- Protect intellectual property

### Model Security
- Prevent model theft
- Protect against adversarial attacks
- Implement input validation
- Secure model APIs
- Monitor for anomalies
- Document security measures

---
Generated with Cursor Config Generator
`;
}

