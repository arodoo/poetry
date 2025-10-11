/*
 * File: .detoxrc.js
 * Purpose: Detox e2e test configuration for React Native mobile app.
 * Defines test runner, devices, apps, and build configurations.
 * Copyright 2025 - All rights reserved.
 */

module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'tests/e2e/config/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build:
        'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
    },
  },
  devices: {
    simulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_5_API_34',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
  },
  configurations: {
    'android.debug': {
      device: 'simulator',
      app: 'android.debug',
    },
    'android.release': {
      device: 'simulator',
      app: 'android.release',
    },
    'android.attached': {
      device: 'attached',
      app: 'android.debug',
    },
  },
};
