<!--
File: config-structure-guide.md
Purpose: Comprehensive guide for organizing and maintaining the backend configuration structure. Provides clear guidelines for adding new features, avoiding circular dependencies, and following DDD principles.
All Rights Reserved. Arodi Emmanuel
-->

# Backend Configuration Structure Guide

## Overview

The backend configuration is organized following Domain-Driven Design (DDD)
principles with a focus on preventing circular dependencies and maintaining
clear separation of concerns. Configurations are grouped by bounded contexts and
domains.

## Current Structure

```
config/
├── app/           # General application configuration
│   └── AppConfigComposition.java
├── auth/          # Authentication domain configuration
│   ├── AuthComposition.java
│   ├── AuthCoreBeans.java
│   ├── AuthProperties.java
│   ├── AuthPropertiesValidator.java
│   ├── AuthSupportBeans.java
│   ├── AuthSupportCoreConfig.java
│   ├── AuthSupportSecurityConfig.java
│   └── AuthUseCaseBeans.java
├── http/          # HTTP client and communication
│   └── HttpComposition.java
├── i18n/          # Internationalization
│   └── I18nConfig.java
├── user/          # User management domain
│   └── UserComposition.java
└── web/           # Web/MVC configuration
    └── WebConfig.java
```

## Principles

### 1. Domain Separation

- Each domain gets its own subpackage
- Configurations are grouped by bounded context
- Cross-domain dependencies are minimized

### 2. Dependency Direction

- Infrastructure depends on Application
- Application depends on Domain
- Domain has no dependencies (pure business logic)
- Configuration wires everything together

### 3. File Size Limits

- No file exceeds 80 lines
- Split large configurations into focused classes
- Use composition over monolithic configs

### 4. Naming Conventions

- `{Domain}Composition.java` - Main wiring for domain
- `{Domain}{Concern}Beans.java` - Specific bean configurations
- `{Domain}Properties.java` - Configuration properties
- `{Domain}{Concern}Config.java` - Specialized configurations

## Adding New Features

### Step 1: Identify Domain

Determine which domain your feature belongs to:

- `auth` - Authentication, authorization, security
- `user` - User management, profiles
- `app` - General application concerns
- `http` - External API communication
- `web` - Web layer, MVC, CORS
- `i18n` - Internationalization

### Step 2: Create Subpackage (if needed)

```bash
# Create new domain subpackage
mkdir config/newdomain

# Or add to existing domain
# Files go in appropriate domain subpackage
```

### Step 3: Configuration Classes

#### For New Domain:

```java
// config/newdomain/NewDomainComposition.java
package com.poetry.poetry_backend.config.newdomain;

@Configuration
public class NewDomainComposition {
  // Main wiring for the domain
}

// config/newdomain/NewDomainProperties.java
@ConfigurationProperties(prefix = "newdomain")
public class NewDomainProperties {
  // Domain-specific properties
}

// config/newdomain/NewDomainBeans.java
@Configuration
public class NewDomainBeans {
  // Bean definitions
}
```

#### For Existing Domain:

```java
// config/auth/NewAuthFeatureBeans.java
package com.poetry.poetry_backend.config.auth;

@Configuration
public class NewAuthFeatureBeans {
  // New feature beans
}
```

### Step 4: Update Infrastructure

If your feature requires infrastructure adapters:

1. Create adapters in appropriate infrastructure package
2. Update configuration to wire the adapters
3. Ensure proper dependency injection

### Step 5: Update Imports

When moving or creating new config classes:

1. Update package declarations
2. Update all import statements in infrastructure classes
3. Verify no circular dependencies

## Avoiding Circular Dependencies

### Common Patterns to Avoid

```java
// ❌ BAD: Cross-domain dependency
@Configuration
public class AuthConfig {
  @Bean
  UserService userService() { ... }
}

@Configuration
public class UserConfig {
  @Bean
  AuthService authService() { ... }  // Circular!
}
```

### Correct Approach

```java
// ✅ GOOD: Domain isolation
@Configuration
public class AuthComposition {
  // Only auth-related beans
}

@Configuration
public class UserComposition {
  // Only user-related beans
  // Use interfaces/ports for cross-domain communication
}
```

### Dependency Rules

1. **Same Package**: Classes in same package can depend on each other
2. **Cross Package**: Use interfaces/ports from Application layer
3. **Infrastructure**: Only depend on Application ports, never other
   infrastructure
4. **Configuration**: Wire everything, but don't create business logic

## File Organization Guidelines

### When to Split Files

- File exceeds 80 lines
- Multiple concerns in one file
- Better testability/separation

### Naming Patterns

- `Composition.java` - Main domain wiring
- `CoreBeans.java` - Essential domain beans
- `SupportBeans.java` - Supporting infrastructure
- `UseCaseBeans.java` - Application use cases
- `Properties.java` - Configuration properties
- `Config.java` - Specialized configurations

## Testing Configuration

### Unit Tests

```java
@SpringBootTest
class AuthCompositionTest {
  @Autowired
  ApplicationContext context;

  @Test
  void allBeansLoadSuccessfully() {
    // Verify beans are created without errors
  }
}
```

### Integration Tests

```java
@SpringBootTest
class ConfigIntegrationTest {
  @Test
  void noCircularDependencies() {
    // Test that context loads without cycles
  }
}
```

### Test Organization

Test files follow the same domain-based structure as main configuration:

```
src/test/java/com/poetry/poetry_backend/config/
├── app/
│   └── AppPropertiesValidationTest.java
├── auth/
│   ├── AuthPropertiesI18nTest.java
│   └── AuthPropertiesValidationI18nTest.java
└── ...
```

## Maintenance Tasks

### Regular Audits

1. Check for circular dependencies
2. Verify file sizes don't exceed limits
3. Ensure proper package organization
4. Update this guide when structure changes

### Refactoring

When files grow too large:

1. Identify logical groupings
2. Split into focused classes
3. Update package declarations
4. Update all imports
5. Test thoroughly

## Troubleshooting

### Common Issues

**Compilation Errors**: Check import statements after package moves **Circular
Dependencies**: Review dependency directions **Bean Not Found**: Verify
@Configuration annotations and component scanning **File Size**: Split large
files following naming patterns

### Verification Commands

```bash
# Check for circular dependencies
./gradlew dependencies

# Verify compilation
./gradlew compileJava

# Check file sizes
find . -name "*.java" -exec wc -l {} \; | sort -nr
```

## Examples

### Adding Auth Feature

```java
// config/auth/TwoFactorAuthBeans.java
@Configuration
public class TwoFactorAuthBeans {
  @Bean
  TwoFactorAuthPort twoFactorAuthPort() {
    return new SmsTwoFactorAdapter();
  }
}

// Update AuthUseCaseBeans.java
@Configuration
public class AuthUseCaseBeans {
  @Bean
  LoginUseCase loginUseCase(AuthPort auth, TwoFactorAuthPort twoFactor) {
    return new LoginUseCase(auth, twoFactor);
  }
}
```

### Adding New Domain

```java
// config/billing/BillingComposition.java
@Configuration
@EnableConfigurationProperties(BillingProperties.class)
public class BillingComposition {
  // Billing domain wiring
}
```

This structure ensures maintainable, testable, and scalable configuration
management.
