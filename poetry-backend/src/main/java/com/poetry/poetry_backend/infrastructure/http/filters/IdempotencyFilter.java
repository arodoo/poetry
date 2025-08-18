/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
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
      if (key != null &&
          !key.isBlank() &&
          !idempotency.register(key)) {
        res.setStatus(HttpStatus.CONFLICT.value());
        return;
      }
    }
    chain.doFilter(request, response);
  }
}
