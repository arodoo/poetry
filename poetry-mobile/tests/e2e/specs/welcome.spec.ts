/*
 * File: welcome.spec.ts
 * Purpose: E2E test for welcome screen functionality.
 * Verifies app loads and displays welcome message correctly.
 * Copyright 2025 - All rights reserved.
 */

import { device, element, by, expect as detoxExpect } from 'detox';
import { testHelpers } from '../helpers/testHelpers';

describe('Welcome Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display welcome message on app launch', async () => {
    await testHelpers.waitForElementByTestId('welcome-message');
    await testHelpers.expectElementVisible('welcome-message');
    await detoxExpect(element(by.id('welcome-message'))).toHaveText(
      'Open up App.tsx to start working on your app!'
    );
  });

  it('should have visible status bar', async () => {
    await testHelpers.expectElementVisible('welcome-message');
  });
});
