/*
 * File: NonRetryableException.java
 * Purpose: Represent an exception type used to signal that an operation must
 * not be retried by HTTP clients or idempotency mechanisms. This exception
 * type clarifies intent in adapter code and enables retry filters to detect
 * non-retryable conditions explicitly. Using a dedicated type improves
 * readability and error handling consistency.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.common.http;

public class NonRetryableException extends RuntimeException {
  public NonRetryableException(String message, Throwable cause) {
    super(message, cause);
  }
}
