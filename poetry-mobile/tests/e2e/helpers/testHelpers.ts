/*
 * File: testHelpers.ts
 * Purpose: Common helper functions for Detox e2e tests.
 * Provides utilities for waiting, scrolling, and assertions.
 * Copyright 2025 - All rights reserved.
 */

import { element, by, waitFor } from 'detox';

export const testHelpers = {
  async waitForElementByTestId(testId: string, timeout = 5000) {
    await waitFor(element(by.id(testId)))
      .toBeVisible()
      .withTimeout(timeout);
  },

  async tapByTestId(testId: string) {
    await element(by.id(testId)).tap();
  },

  async typeTextByTestId(testId: string, text: string) {
    await element(by.id(testId)).typeText(text);
  },

  async scrollToTestId(scrollViewTestId: string, targetTestId: string) {
    await waitFor(element(by.id(targetTestId)))
      .toBeVisible()
      .whileElement(by.id(scrollViewTestId))
      .scroll(200, 'down');
  },

  async expectElementVisible(testId: string) {
    await expect(element(by.id(testId))).toBeVisible();
  },

  async expectElementText(testId: string, text: string) {
    await expect(element(by.id(testId))).toHaveText(text);
  },
};
