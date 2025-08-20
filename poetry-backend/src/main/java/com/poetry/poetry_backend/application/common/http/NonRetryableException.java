/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.common.http;

/* File: NonRetryableException.java
 * Purpose: A marker runtime exception used to stop retry attempts for known
 * non-retryable scenarios (e.g., HTTP 4xx). Allows the RetryTemplate to
 * differentiate between transient and permanent failures and fail fast for
 * client errors. This keeps retry policies explicit and maintainable.
 * All Rights Reserved. Arodi Emmanuel
 */

public class NonRetryableException extends RuntimeException {
  public NonRetryableException(String message, Throwable cause) {
    super(message, cause);
  }
}
