/*
 * File: init.ts
 * Purpose: Detox test environment initialization and setup.
 * Configures device, app launch, and global test hooks.
 * Copyright 2025 - All rights reserved.
 */

import { device } from 'detox';

beforeAll(async () => {
  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'YES', location: 'always' },
  });
});

beforeEach(async () => {
  await device.reloadReactNative();
});

afterAll(async () => {
  await device.terminateApp();
});
