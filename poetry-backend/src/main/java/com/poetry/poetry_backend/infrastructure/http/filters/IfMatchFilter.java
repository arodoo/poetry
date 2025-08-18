/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.http.filters;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.application.user.usecase.GetUserByIdUseCase;
import com.poetry.poetry_backend.interfaces.v1.user.UserDtos;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class IfMatchFilter implements Filter {
  private final GetUserByIdUseCase getUser;
  private final ETagPort etag;
  private final ObjectMapper json;

  public IfMatchFilter(
      GetUserByIdUseCase getUser,
      ETagPort etag,
      ObjectMapper json) {
    this.getUser = getUser;
    this.etag = etag;
    this.json = json;
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
    String uri = req.getRequestURI();
    boolean mutating =
        "PUT".equals(m) ||
        "DELETE".equals(m);
    if (mutating && uri.matches("/api/v1/users/\\d+")) {
      String ifMatch = req.getHeader(HttpHeaders.IF_MATCH);
      if (ifMatch == null || ifMatch.isBlank()) {
        res.setStatus(HttpStatus.PRECONDITION_REQUIRED.value());
        return;
      }
      Long id = Long.valueOf(uri.substring(uri.lastIndexOf('/') + 1));
      String provided = ifMatch.replace("\"", "");
      String current = etag.compute(
          json.writeValueAsString(
              UserDtos.toResponse(getUser.execute(id))));
      if (!current.equals(provided)) {
        res.setStatus(HttpStatus.PRECONDITION_FAILED.value());
        return;
      }
    }
    chain.doFilter(request, response);
  }
}
