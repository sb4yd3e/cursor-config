import { ProjectFormData } from '@/types';

export function generateMobileRules(data: ProjectFormData): string {
  const isIOS = data.domain === 'mobile-ios';
  const isAndroid = data.domain === 'mobile-android';
  const isReactNative = data.domain === 'mobile-react-native';
  const isFlutter = data.technologyStack.frameworks.includes('Flutter');
  
  return `# Mobile Development Cursor AI Rules

## Project: ${data.projectName}
${data.projectDescription ? `Description: ${data.projectDescription}\n` : ''}
Platform: ${isFlutter ? 'FLUTTER (CROSS-PLATFORM)' : data.domain.replace('mobile-', '').toUpperCase()}

## General Mobile Development Principles

### App Architecture
- Follow platform-specific architecture patterns
${isIOS ? '- Use MVVM or Clean Architecture for iOS\n' : ''}${isAndroid ? '- Use MVVM with Android Architecture Components\n' : ''}${isReactNative ? '- Use component-based architecture\n' : ''}- Separate business logic from UI
- Implement proper dependency injection
- Use repository pattern for data management
- Implement proper navigation patterns

### Code Organization
- Organize by feature, not by type
- Keep files focused and small
- Use proper module structure
- Implement clear separation of concerns
- Follow platform conventions

${isIOS ? `## iOS Development (Swift/SwiftUI)

### SwiftUI Best Practices
- Use declarative UI patterns
- Implement proper state management with @State, @Binding, @StateObject
- Use ViewModifiers for reusable styling
- Follow Swift naming conventions
- Use proper property wrappers
- Implement proper view composition
- Use PreviewProvider for development

### UIKit Best Practices (if used)
- Use Auto Layout properly
- Avoid retain cycles
- Use proper delegation patterns
- Implement proper memory management
- Use storyboards or programmatic UI consistently

### iOS-Specific Guidelines
- Follow Apple's Human Interface Guidelines
- Support iOS accessibility features (VoiceOver)
- Implement proper dark mode support
- Use SF Symbols for icons
- Follow App Store guidelines
- Handle app lifecycle properly
- Implement proper background tasks

### Performance
- Profile with Instruments
- Optimize image loading
- Use lazy loading
- Implement proper caching
- Avoid blocking main thread
- Use efficient data structures

` : ''}${isAndroid ? `## Android Development (Kotlin)

### Kotlin Best Practices
- Use Kotlin idioms and features
- Use data classes appropriately
- Implement proper null safety
- Use coroutines for async operations
- Use sealed classes for state management
- Use extension functions appropriately

### Jetpack Compose (if used)
- Use composable functions properly
- Implement proper state management
- Use remember and rememberSaveable
- Follow composition over inheritance
- Use Modifier chains effectively
- Implement proper recomposition optimization

### XML Layouts (if used)
- Use ConstraintLayout for complex layouts
- Implement proper view binding
- Avoid deep view hierarchies
- Use include and merge tags
- Implement proper resource organization

### Android Architecture Components
- Use ViewModel for UI logic
- Implement LiveData or StateFlow
- Use Room for local database
- Implement proper navigation with Navigation Component
- Use WorkManager for background tasks
- Implement proper dependency injection (Hilt/Dagger)

### Android-Specific Guidelines
- Follow Material Design guidelines
- Support Android accessibility (TalkBack)
- Implement proper permission handling
- Handle configuration changes properly
- Support different screen sizes and densities
- Follow Android best practices
- Implement proper notification handling

### Performance
- Use Android Profiler
- Optimize layout rendering
- Implement proper image loading (Coil, Glide)
- Use RecyclerView efficiently
- Avoid memory leaks
- Use ProGuard/R8 for optimization

` : ''}${isReactNative ? `## React Native Development

### React Native Best Practices
- Use functional components with hooks
- Implement proper state management (Redux, Context, Zustand)
- Use TypeScript for type safety
- Follow React best practices
- Use proper component lifecycle
- Implement proper error boundaries

### Platform-Specific Code
- Use Platform.select() when needed
- Create platform-specific files (.ios.tsx, .android.tsx)
- Test on both platforms
- Handle platform differences gracefully
- Use platform-specific components when appropriate

### Navigation
- Use React Navigation properly
- Implement proper navigation structure
- Handle deep linking
- Implement proper navigation state management
- Use proper navigation patterns

### Styling
- Use StyleSheet.create()
- Implement responsive designs
- Use Flexbox properly
- Create reusable style constants
- Support different screen sizes
- Implement proper theming

### Native Modules
- Create native modules when needed
- Use community packages when available
- Document native module usage
- Test native functionality thoroughly
- Handle platform differences

### Performance
- Use FlatList for long lists
- Implement proper image optimization
- Use memoization (React.memo, useMemo)
- Avoid inline functions in render
- Use Hermes for better performance
- Profile with Flipper
- Implement proper lazy loading

` : ''}${isFlutter ? `## Flutter Development

### Flutter Best Practices
- Use proper widget composition
- Implement stateless widgets when possible
- Use StatefulWidget only when needed state
- Follow Flutter's reactive programming model
- Use const constructors where possible
- Implement proper widget keys

### State Management (Flutter)
- Choose appropriate state solution (Provider, Riverpod, BLoC, GetX)
- Keep business logic separate from UI
- Use ChangeNotifier appropriately
- Implement proper stream management
- Avoid setState in large widgets
- Use ValueNotifier for simple state

### Flutter Widgets
- Use Material or Cupertino widgets appropriately
- Build custom widgets for reusability
- Implement proper widget lifecycle
- Use Builder widgets when needed
- Leverage Flutter's composition over inheritance
- Implement proper dispose methods

### Dart Best Practices
- Use null safety properly
- Implement proper async/await patterns
- Use late initialization appropriately
- Follow Dart naming conventions
- Use extension methods effectively
- Implement proper error handling
- Use sealed classes for type safety

### Flutter Performance
- Use const widgets for better performance
- Implement proper list rendering (ListView.builder)
- Avoid unnecessary rebuilds
- Use RepaintBoundary for complex widgets
- Profile with Flutter DevTools
- Optimize images and assets
- Implement proper caching

### Navigation (Flutter)
- Use Navigator 2.0 or go_router
- Implement proper route management
- Handle deep linking
- Use named routes appropriately
- Implement proper navigation state

### Platform-Specific Code (Flutter)
- Use Platform.isIOS and Platform.isAndroid
- Implement platform channels when needed
- Use conditional imports
- Handle platform differences gracefully
- Test on both platforms

### Flutter Packages
- Use pub.dev packages wisely
- Keep dependencies updated
- Implement proper dependency injection
- Use dev_dependencies appropriately
- Document package usage

` : ''}## UI/UX Best Practices

### Design Principles
- Follow platform-specific design guidelines
${isIOS ? '- Follow iOS Human Interface Guidelines\n' : ''}${isAndroid ? '- Follow Material Design principles\n' : ''}${isReactNative ? '- Maintain platform-specific look and feel\n' : ''}- Implement consistent navigation patterns
- Use platform-native components
- Provide clear visual feedback
- Implement proper loading states
- Show error states gracefully

### Responsive Design
- Support different screen sizes
- Support tablet layouts
- Handle orientation changes
- Use proper scaling
- Test on multiple devices
- Support different pixel densities

### Accessibility
- Support screen readers
- Implement proper content descriptions
- Use sufficient color contrast
- Support dynamic text sizing
- Test with accessibility tools
- Follow WCAG guidelines

## State Management

### Local State
- Use component state for UI state
- Keep state as local as possible
- Lift state when necessary
${isReactNative ? '- Use useState, useReducer appropriately\n' : ''}
### Global State
${isReactNative ? '- Use Redux, Context, or Zustand for global state\n' : ''}${isIOS ? '- Use @StateObject, @EnvironmentObject\n' : ''}${isAndroid ? '- Use ViewModel with LiveData/StateFlow\n' : ''}- Keep global state minimal
- Implement proper state updates
- Use proper state persistence

## Data Management

### Local Storage
${isReactNative ? '- Use AsyncStorage or MMKV\n' : ''}${isIOS ? '- Use UserDefaults for preferences\n- Use Core Data or SwiftData for complex data\n' : ''}${isAndroid ? '- Use SharedPreferences for simple data\n- Use Room for complex data\n' : ''}- Implement proper data encryption
- Handle storage errors
- Implement proper data migration

### Network Requests
- Use proper HTTP clients
- Implement proper error handling
- Use retry logic
- Implement request caching
- Handle offline scenarios
- Implement proper timeout
- Use proper serialization

### Offline Support
- Implement offline-first approach when appropriate
- Cache data properly
- Sync data when online
- Handle conflicts
- Provide offline indicators

## Testing

${data.requireUnitTests ? `### Unit Testing
- Test business logic
- Test view models
- Test utilities and helpers
- Mock dependencies
- Achieve ${data.minTestCoverage || 80}% coverage
- Use ${data.testingFrameworks.join(', ')}

` : ''}${data.requireIntegrationTests ? `### Integration Testing
- Test API integrations
- Test database operations
- Test navigation flows
- Test state management

` : ''}${data.requireE2ETests ? `### E2E Testing
${isReactNative ? '- Use Detox for E2E testing\n' : ''}${isIOS ? '- Use XCUITest for UI testing\n' : ''}${isAndroid ? '- Use Espresso for UI testing\n' : ''}${isFlutter ? '- Use Flutter integration tests\n- Use flutter_driver for E2E testing\n- Use Patrol for advanced E2E\n' : ''}- Test critical user flows
- Test on real devices
- Test different screen sizes

` : ''}### Platform-Specific Testing
${isIOS ? '- Use XCTest for unit tests\n- Use Quick/Nimble for BDD testing\n' : ''}${isAndroid ? '- Use JUnit for unit tests\n- Use Mockito for mocking\n' : ''}${isReactNative ? '- Use Jest for unit/integration tests\n- Use React Native Testing Library\n' : ''}${isFlutter ? '- Use flutter_test for widget testing\n- Use mockito for Dart mocking\n- Use integration_test package\n- Test on both platforms\n' : ''}
## Performance Optimization

### General Performance
- Optimize app startup time
- Reduce memory footprint
- Implement proper image caching
- Use lazy loading
- Profile regularly
- Optimize animations (60 FPS)
- Reduce app size

### Network Performance
- Minimize network requests
- Implement request batching
- Use efficient data formats (JSON, Protocol Buffers)
- Compress images
- Implement proper caching

### Battery Optimization
- Minimize background tasks
- Optimize location updates
- Reduce network usage
- Use efficient algorithms

## Security

### Mobile Security Best Practices
- Store sensitive data securely
${isIOS ? '- Use Keychain for credentials\n' : ''}${isAndroid ? '- Use Android Keystore for credentials\n' : ''}${isReactNative ? '- Use react-native-keychain\n' : ''}- Implement certificate pinning
- Validate SSL certificates
- Obfuscate sensitive code
- Implement jailbreak/root detection
- Use secure communication (HTTPS)
- Validate all inputs
- Implement proper authentication

### Data Security
- Encrypt local databases
- Never log sensitive information
- Implement proper session management
- Use secure random generators
- Clear sensitive data from memory

## App Lifecycle

### Lifecycle Management
- Handle app state changes properly
- Save state on background
- Restore state on foreground
- Handle deep links
- Implement proper navigation state

### Background Tasks
${isIOS ? '- Use Background Fetch or Background Tasks\n' : ''}${isAndroid ? '- Use WorkManager for background jobs\n' : ''}${isReactNative ? '- Use background task libraries\n' : ''}- Minimize background execution
- Handle task completion properly
- Test background scenarios

## Deployment

${data.useCICD ? `### CI/CD
- Automate builds with ${data.cicdTool || 'CI/CD tool'}
- Run tests automatically
- Automate app signing
- Deploy to TestFlight/Internal Testing
- Implement versioning strategy
` : ''}
### Release Process
${isIOS ? '- Follow App Store guidelines\n- Prepare App Store assets\n- Test on TestFlight\n' : ''}${isAndroid ? '- Follow Play Store guidelines\n- Prepare Play Store listing\n- Test with Internal Testing\n' : ''}- Use semantic versioning
- Maintain changelog
- Test thoroughly before release
- Monitor crash reports
- Implement staged rollouts

## Monitoring & Analytics

### Crash Reporting
- Implement crash reporting (Firebase Crashlytics, Sentry)
- Monitor crash-free rate
- Fix critical crashes immediately
- Track crash patterns

### Analytics
- Track key user events
- Monitor app performance
- Track user engagement
- Respect user privacy
- Follow GDPR/privacy regulations

---
Generated with Cursor Config Generator
`;
}

