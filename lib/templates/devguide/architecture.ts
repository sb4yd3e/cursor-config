import { ProjectFormData } from '@/types';

export function generateArchitecture(data: ProjectFormData): string {
  const isWeb = data.domain.includes('web');
  const isMobile = data.domain.includes('mobile');
  const isDataScience = data.domain === 'data-science';
  const isDevOps = data.domain === 'devops';

  return `## Architecture

### System Overview

${isWeb ? `This is a ${data.domain.replace('web-', '')} web application built with modern web technologies. The architecture follows industry best practices for scalability, maintainability, and security.
` : isMobile ? `This is a mobile application for ${data.domain.replace('mobile-', '')} platform(s). The architecture is designed for optimal performance and user experience.
` : isDataScience ? `This is a data science project focused on machine learning and data analysis. The architecture supports reproducibility and experimentation.
` : isDevOps ? `This is a DevOps infrastructure project. The architecture follows Infrastructure as Code principles and automation best practices.
` : `This project follows modern software development practices with a focus on maintainability and scalability.
`}
### High-Level Architecture

\`\`\`
${isWeb && data.domain === 'web-fullstack' ? `┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Client    │─────▶│   Backend    │─────▶│  Database   │
│  (Frontend) │◀─────│   API Server │◀─────│             │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │   External  │
                     │   Services  │
                     └─────────────┘
` : isWeb && data.domain === 'web-frontend' ? `┌─────────────┐      ┌──────────────┐
│   Client    │─────▶│   External   │
│  (Frontend) │◀─────│   API        │
└─────────────┘      └──────────────┘
` : isWeb && data.domain === 'web-backend' ? `┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Client    │─────▶│   Backend    │─────▶│  Database   │
│             │◀─────│   API Server │◀─────│             │
└─────────────┘      └──────────────┘      └─────────────┘
` : isMobile ? `┌──────────────┐      ┌──────────────┐
│   Mobile     │─────▶│   Backend    │
│   App        │◀─────│   API        │
└──────────────┘      └──────────────┘
        │                     │
        ▼                     ▼
┌──────────────┐      ┌──────────────┐
│   Local      │      │   Database   │
│   Storage    │      │              │
└──────────────┘      └──────────────┘
` : isDataScience ? `┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Data       │─────▶│   Feature    │─────▶│   Model      │
│   Ingestion  │      │   Engineering│      │   Training   │
└──────────────┘      └──────────────┘      └──────────────┘
                                                    │
                                                    ▼
                                             ┌──────────────┐
                                             │   Model      │
                                             │   Serving    │
                                             └──────────────┘
` : `[Add your architecture diagram here]
`}\`\`\`

### Design Patterns

This project employs the following design patterns:

${isWeb ? `- **MVC/MVVM Pattern:** Separation of concerns between Model, View, and Controller/ViewModel
${data.domain === 'web-fullstack' || data.domain === 'web-backend' ? '- **Repository Pattern:** Data access abstraction layer\n- **Service Layer Pattern:** Business logic encapsulation\n' : ''}- **Component Pattern:** Reusable UI components
- **Observer Pattern:** State management and event handling
` : isMobile ? `- **MVVM Pattern:** Separation of UI and business logic
- **Repository Pattern:** Data access abstraction
- **Dependency Injection:** Loose coupling and testability
- **Observer Pattern:** Reactive data flow
` : isDataScience ? `- **Pipeline Pattern:** Data processing workflows
- **Strategy Pattern:** Interchangeable algorithms
- **Factory Pattern:** Model creation and management
` : `- **Separation of Concerns:** Clear boundaries between components
- **Dependency Injection:** Loose coupling between modules
- **Repository Pattern:** Data access abstraction
`}
### Folder Structure

\`\`\`
${isWeb && (data.technologyStack.frameworks.includes('Next.js') || data.domain.includes('web-frontend')) ? `${data.projectName.toLowerCase().replace(/\s+/g, '-')}/
├── app/                    # Next.js app directory (or src/)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── api/               # API routes
│   └── [feature]/         # Feature-based pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layouts/          # Layout components
├── lib/                   # Utility libraries
│   ├── api/              # API client
│   ├── utils/            # Helper functions
│   └── hooks/            # Custom hooks
├── types/                 # TypeScript types
├── styles/                # Global styles
├── public/                # Static assets
└── tests/                 # Test files
` : isWeb && data.domain === 'web-backend' ? `${data.projectName.toLowerCase().replace(/\s+/g, '-')}/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── models/           # Data models
│   ├── repositories/     # Data access layer
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration
│   └── types/            # TypeScript types
├── tests/                # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── migrations/           # Database migrations
└── seeds/                # Database seeds
` : isMobile && data.domain === 'mobile-react-native' ? `${data.projectName.toLowerCase().replace(/\s+/g, '-')}/
├── src/
│   ├── components/       # React Native components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation setup
│   ├── services/         # API services
│   ├── store/            # State management
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   └── assets/           # Images, fonts, etc.
├── android/              # Android native code
├── ios/                  # iOS native code
└── tests/                # Test files
` : isMobile && data.domain === 'mobile-ios' ? `${data.projectName.toLowerCase().replace(/\s+/g, '-')}/
├── Sources/
│   ├── Views/            # SwiftUI views
│   ├── ViewModels/       # View models
│   ├── Models/           # Data models
│   ├── Services/         # Business logic
│   ├── Networking/       # API client
│   ├── Utilities/        # Helper functions
│   └── Resources/        # Assets, localization
├── Tests/                # Unit tests
└── UITests/              # UI tests
` : isMobile && data.domain === 'mobile-android' ? `${data.projectName.toLowerCase().replace(/\s+/g, '-')}/
├── app/src/main/
│   ├── java/[package]/
│   │   ├── ui/           # UI components
│   │   ├── viewmodel/    # ViewModels
│   │   ├── model/        # Data models
│   │   ├── repository/   # Data repositories
│   │   ├── network/      # API client
│   │   └── util/         # Utilities
│   └── res/              # Resources
│       ├── layout/       # XML layouts
│       ├── drawable/     # Images
│       └── values/       # Strings, colors
└── app/src/test/         # Tests
` : isDataScience ? `${data.projectName.toLowerCase().replace(/\s+/g, '-')}/
├── data/
│   ├── raw/              # Original data
│   ├── processed/        # Processed data
│   └── external/         # External data
├── notebooks/            # Jupyter notebooks
│   ├── exploratory/      # EDA
│   └── experiments/      # Experiments
├── src/
│   ├── data/             # Data loading
│   ├── features/         # Feature engineering
│   ├── models/           # Model definitions
│   ├── visualization/    # Plotting
│   └── utils/            # Utilities
├── models/               # Trained models
├── reports/              # Generated reports
└── tests/                # Tests
` : `[Add your folder structure here]
`}\`\`\`

### Component Architecture

${isWeb ? `#### Frontend Components

**Atomic Design Hierarchy:**

1. **Atoms:** Basic building blocks (buttons, inputs, labels)
2. **Molecules:** Simple component groups (form fields, cards)
3. **Organisms:** Complex components (headers, forms, tables)
4. **Templates:** Page layouts
5. **Pages:** Specific page implementations

**Component Principles:**
- Keep components small and focused
- Use composition over inheritance
- Implement proper prop types/interfaces
- Use controlled components for forms
- Implement error boundaries
- Optimize with memo/lazy loading
` : isMobile ? `#### UI Components

**Component Hierarchy:**

1. **Basic Components:** Buttons, text inputs, labels
2. **Composite Components:** Form fields, list items, cards
3. **Screen Components:** Full screen views
4. **Navigation Components:** Tab bars, navigation bars

**Component Principles:**
- Reusable and composable components
- Platform-specific components when needed
- Proper state management
- Performance optimization
- Accessibility support
` : ''}
### Data Flow

${isWeb && (data.domain === 'web-fullstack' || data.domain === 'web-frontend') ? `1. **User Interaction:** User triggers an action in the UI
2. **Action Dispatch:** Action is dispatched to state management
3. **State Update:** State is updated based on the action
4. **Re-render:** Components re-render with new state
5. **API Calls:** Async operations fetch/update data
6. **Data Sync:** State is synchronized with server
` : isMobile ? `1. **User Input:** User interacts with UI
2. **ViewModel Update:** ViewModel processes user input
3. **Business Logic:** Services handle business logic
4. **Data Layer:** Repository accesses data
5. **State Update:** UI state is updated
6. **View Refresh:** View reflects new state
` : isDataScience ? `1. **Data Ingestion:** Raw data is loaded
2. **Data Cleaning:** Data is validated and cleaned
3. **Feature Engineering:** Features are created
4. **Model Training:** Model learns from data
5. **Model Evaluation:** Model performance is assessed
6. **Model Deployment:** Model serves predictions
` : `[Describe your data flow here]
`}
### Database Schema

${data.technologyStack.databases.length > 0 ? `#### Entity Relationship

\`\`\`
[Add your ERD diagram here]

Example entities:
- Users
- [Entity 2]
- [Entity 3]
\`\`\`

#### Key Tables

**users**
- id (PK)
- email
- password_hash
- created_at
- updated_at

[Add more tables as needed]
` : `[Add database schema when implemented]
`}
### API Architecture

${data.includeApiDocs ? `#### RESTful API Design

**Base URL:** \`/api/v1\`

**Endpoint Conventions:**
- \`GET /resources\` - List all resources
- \`GET /resources/:id\` - Get single resource
- \`POST /resources\` - Create resource
- \`PUT /resources/:id\` - Update resource
- \`DELETE /resources/:id\` - Delete resource

**Response Format:**
\`\`\`json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "error": null
}
\`\`\`

**Authentication:**
- JWT token-based authentication
- Include token in Authorization header
- Token expiration and refresh mechanism

` : ''}
### Security Architecture

**Security Layers:**

1. **Authentication:** User identity verification
2. **Authorization:** Access control and permissions
3. **Data Encryption:** Encryption at rest and in transit
4. **Input Validation:** Request data validation
5. **Rate Limiting:** Prevent abuse
6. **Monitoring:** Security event logging

${data.domain.includes('web') ? `**Web Security:**
- HTTPS only
- CSRF protection
- XSS prevention
- SQL injection prevention
- Security headers
- Content Security Policy
` : ''}
### Performance Considerations

**Optimization Strategies:**

${isWeb ? `- Code splitting and lazy loading
- Image optimization
- Caching strategies
- CDN usage
- Bundle size optimization
- Server-side rendering (SSR)
- Static site generation (SSG)
` : isMobile ? `- Image caching and optimization
- Lazy loading
- Background processing
- Efficient list rendering
- Memory management
- Network optimization
` : isDataScience ? `- Efficient data processing
- Model optimization
- Batch processing
- Caching predictions
- Parallel processing
` : `- Efficient algorithms
- Caching strategies
- Database optimization
- Resource management
`}
### Scalability

**Horizontal Scaling:**
- Load balancing
- Stateless services
- Distributed caching
- Message queues

**Vertical Scaling:**
- Resource optimization
- Database indexing
- Query optimization
- Efficient algorithms

---
`;
}

