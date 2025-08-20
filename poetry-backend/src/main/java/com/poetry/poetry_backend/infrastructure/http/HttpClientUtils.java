/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.http;

/* File: HttpClientUtils.java
 * Purpose: Utility class that provides common HTTP client operations for
 * RestClientAdapter. This class handles retry logic and error handling to
 * keep the main adapter focused on interface implementation.
 * All Rights Reserved. Arodi Emmanuel
 */

import java.util.function.Supplier;

import org.springframework.retry.support.RetryTemplate;

import com.poetry.poetry_backend.application.common.http.NonRetryableException;

final class HttpClientUtils {
  
  private HttpClientUtils() { }

  static <T> T executeWithRetry(RetryTemplate retryTemplate, Supplier<T> action) {
    return retryTemplate.execute(ctx -> {
      try {
        return action.get();
      } catch (org.springframework.web.client.RestClientResponseException ex) {
        int code = ex.getStatusCode().value();
        if (code >= 400 && code < 500) {
          throw new NonRetryableException("Non-retryable 4xx", ex);
        }
        throw ex;
      }
    });
  }
}
