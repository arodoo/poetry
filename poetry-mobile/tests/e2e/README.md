# E2E Testing with Detox

End-to-end testing for Poetry Mobile using Detox framework.
Tests run on real devices or emulators to verify app functionality.

## Directory Structure

```
tests/e2e/
├── config/
│   └── jest.config.js      # Jest configuration for Detox
├── helpers/
│   └── testHelpers.ts      # Reusable test utilities and helpers
├── specs/
│   └── welcome.spec.ts     # Test specifications organized by feature
└── init.ts                 # Global test setup and teardown
```

## Prerequisites

- Android Studio with emulator configured
- Detox CLI installed globally: `npm install -g detox-cli`
- Android emulator AVD named `Pixel_5_API_34` (or update `.detoxrc.js`)

## Running Tests

### First Time Setup
```bash
# Build the Android debug APK
npm run test:e2e:build
```

### Run Tests
```bash
# Run all e2e tests
npm run test:e2e

# Build and run tests
npm run test:e2e:rebuild
```

## Writing Tests

### Test File Template
```typescript
import { device, element, by, expect as detoxExpect } from 'detox';
import { testHelpers } from '../helpers/testHelpers';

describe('Feature Name', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should do something', async () => {
    await testHelpers.waitForElementByTestId('element-id');
    await testHelpers.expectElementVisible('element-id');
  });
});
```

### Best Practices

1. **Use testID**: Always add `testID` prop to React Native components
2. **Descriptive names**: Use clear, descriptive test IDs and test names
3. **Wait properly**: Use `waitFor` instead of hardcoded delays
4. **Isolate tests**: Each test should be independent
5. **Clean state**: Use `beforeEach` to reset app state
6. **Helper functions**: Use helpers from `testHelpers.ts`

## Troubleshooting

### Emulator Not Found
Update AVD name in `.detoxrc.js` to match your emulator.

### Build Fails
Ensure Android SDK and Gradle are properly configured.

### Tests Timeout
Increase timeout in `tests/e2e/config/jest.config.js`.
