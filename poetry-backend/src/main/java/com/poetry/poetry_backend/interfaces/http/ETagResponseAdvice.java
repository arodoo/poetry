/*
 * File: ETagResponseAdvice.java
 * Purpose: Adds ETag headers to HTTP responses and manages cache
 * validation semantics for responses. The advice centralizes ETag
 * calculation and header population ensuring consistent caching
 * behavior across controllers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.http;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;

@ControllerAdvice
public class ETagResponseAdvice implements ResponseBodyAdvice<Object> {
  private final ETagPort etag;
  private final ObjectMapper mapper;

  public ETagResponseAdvice(ETagPort etag, ObjectMapper mapper) {
    this.etag = etag;
    this.mapper = mapper;
  }

  @Override
  public boolean supports(
      @NonNull MethodParameter r,
      @NonNull Class<? extends HttpMessageConverter<?>> c) {
    return true;
  }

  @Override
  public Object beforeBodyWrite(
      @Nullable Object body,
      @NonNull MethodParameter r,
      @NonNull MediaType ct,
      @NonNull Class<? extends HttpMessageConverter<?>> cc,
      @NonNull ServerHttpRequest req,
      @NonNull ServerHttpResponse res) {
    if (body == null) {
      return null;
    }
    HttpMethod m = req.getMethod();
    if (m == null || (m != HttpMethod.GET && m != HttpMethod.PUT)) {
      return body;
    }
    // Skip if controller already set an ETag (e.g., tokens endpoint custom logic)
    if (res.getHeaders().containsKey(HttpHeaders.ETAG)) {
      return body;
    }
    try {
      String canonical = mapper.writeValueAsString(body);
      String tag = etag.compute(canonical);
      res.getHeaders().add(HttpHeaders.ETAG, '"' + tag + '"');
      return body;
    } catch (Exception e) {
      return body;
    }
  }
}
