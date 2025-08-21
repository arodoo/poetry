/*
 * File: HttpClientUtils.java
 * Purpose: Utilities for HTTP client operations such as request body
 * conversion, response handling and error mapping. These utilities centralize
 * common client concerns used by RestClient adapters to keep adapter code
 * concise and consistent across the infrastructure. The helpers provide a
 * single place to apply retry logic and to translate HTTP errors into the
 * application's domain exceptions.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.http;

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
