/*
 * File: CorrelationIdFilter.java
 * Purpose: Ensures each request has a Correlation-Id header by
 * generating a UUID when absent then exposing it via CorrelationIdProvider
 * for audit logging and response propagation. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.http.filters;

import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.infrastructure.jpa.audit.CorrelationIdProvider;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

@Component
public class CorrelationIdFilter implements Filter {
  private final CorrelationIdProvider provider;

  public CorrelationIdFilter(CorrelationIdProvider provider) {
    this.provider = provider;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    HttpServletRequest req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;
    String id = req.getHeader("Correlation-Id");
    if (id == null || id.isBlank()) {
      id = UUID.randomUUID().toString();
    }
    provider.set(id);
    try {
      res.setHeader("Correlation-Id", id);
      chain.doFilter(request, response);
    } finally {
      provider.clear();
    }
  }
}
