/*
 * File: CorrelationIdFilter.java
 * Purpose: Legacy placeholder duplicate path replaced with minimal
 * delegating servlet Filter ensuring a Correlation-Id header exists.
 * Retained only for backward compatibility while primary filter lives
 * in filters package. Delegates to main implementation; idempotent so
 * double registration is safe. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.http.correlation;

import java.io.IOException;

import jakarta.servlet.*;

public class CorrelationIdFilter implements Filter {
  private final com.poetry.poetry_backend.infrastructure.http.filters.CorrelationIdFilter delegate;
  public CorrelationIdFilter(
      com.poetry.poetry_backend.infrastructure.http.filters.CorrelationIdFilter delegate) {
    this.delegate = delegate;
  }
  @Override
  public void doFilter(ServletRequest r, ServletResponse s, FilterChain c)
      throws IOException, ServletException { delegate.doFilter(r, s, c); }
}