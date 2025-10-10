/*
 * File: SubscriptionVersionMismatchException.java
 * Purpose: Exception for optimistic locking violations when updating
 * subscription plans. Signals concurrent modification conflicts.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.subscription.exception;

public class SubscriptionVersionMismatchException extends RuntimeException {
  public SubscriptionVersionMismatchException(Long id) {
    super("Subscription version mismatch: " + id);
  }
}
