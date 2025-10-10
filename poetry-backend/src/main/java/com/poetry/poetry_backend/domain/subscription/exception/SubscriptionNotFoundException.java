/*
 * File: SubscriptionNotFoundException.java
 * Purpose: Exception thrown when a subscription plan is not found by ID.
 * Used by adapters and use cases to signal missing resources.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.subscription.exception;

public class SubscriptionNotFoundException extends RuntimeException {
  public SubscriptionNotFoundException(Long id) {
    super("Subscription not found: " + id);
  }
}
