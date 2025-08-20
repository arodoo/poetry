/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.http;

/* File: RestClientAdapter.java
 * Purpose: Infrastructure adapter that implements HttpClientPort using
 * Spring's RestClient. It applies central timeout and retry policies via a
 * configured ClientHttpRequestFactory and RetryTemplate. Delegates retry
 * execution to HttpClientUtils to maintain file size limits.
 * All Rights Reserved. Arodi Emmanuel
 */

import java.util.Map;

import org.springframework.retry.support.RetryTemplate;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;

public class RestClientAdapter implements HttpClientPort {
  private final org.springframework.web.client.RestClient restClient;
  private final RetryTemplate retryTemplate;

  public RestClientAdapter(
      org.springframework.web.client.RestClient restClient,
      RetryTemplate retryTemplate) {
    this.restClient = restClient;
    this.retryTemplate = retryTemplate;
  }

  @Override
  public <T> T get(String url, Map<String, String> headers, Class<T> type) {
    return HttpClientUtils.executeWithRetry(retryTemplate, () -> restClient
        .get()
        .uri(url)
        .headers(h -> headers.forEach(h::add))
        .retrieve()
        .body(type));
  }

  @Override
  public <T> T post(
      String url,
      Object body,
      Map<String, String> headers,
      Class<T> type) {
    return HttpClientUtils.executeWithRetry(retryTemplate, () -> restClient
        .post()
        .uri(url)
        .headers(h -> headers.forEach(h::add))
        .body(body)
        .retrieve()
        .body(type));
  }
}
