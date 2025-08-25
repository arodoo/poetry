/*
 * File: IdempotencyFilter.java
 * Purpose: Servlet filter that enforces idempotency semantics for HTTP
 * endpoints. It validates idempotency keys, stores metadata and prevents
 * duplicate side-effectful operations when configured. This filter keeps
 * idempotency orchestration out of business code and centralizes storage
 * and validation behavior. Updated to allow replay semantics for specific
 * endpoints (auth register) that implement full response replay instead of
 * returning 409 on duplicate keys. All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.http.filters;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.common.port.IdempotencyPort;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class IdempotencyFilter implements Filter {
  private final IdempotencyPort idempotency;

  public IdempotencyFilter(IdempotencyPort idempotency) {
    this.idempotency = idempotency;
  }

  @Override
  public void doFilter(
      ServletRequest request,
      ServletResponse response,
      FilterChain chain)
      throws IOException, ServletException {
    HttpServletRequest req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;
    String m = req.getMethod();
    if ("POST".equals(m) || "PUT".equals(m) || "DELETE".equals(m)) {
      String key = req.getHeader("Idempotency-Key");
      if (key != null && !key.isBlank()) {
        if (allowsReplay(req)) {
          // Register key if first time; ignore duplicate so application layer can replay response
            idempotency.register(key); // intentionally ignore boolean
        } else if (!idempotency.register(key)) {
          res.setStatus(HttpStatus.CONFLICT.value());
          return;
        }
      }
    }
    chain.doFilter(request, response);
  }

  private boolean allowsReplay(HttpServletRequest req) {
    // Currently only auth registration supports exact response replay
    return "POST".equals(req.getMethod()) && "/api/v1/auth/register".equals(req.getRequestURI());
  }
}
