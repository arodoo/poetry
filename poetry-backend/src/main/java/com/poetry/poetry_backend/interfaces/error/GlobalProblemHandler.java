/*
 * File: GlobalProblemHandler.java
 * Purpose: Generic fallback exception handlers (illegal argument and
 * uncaught runtime) producing RFC7807 problems. Specific domain and
 * validation handlers are split into dedicated advice classes to keep
 * files small and focused. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.error;

import java.net.URI;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalProblemHandler {
  private static final URI TYPE = URI.create("https://datatracker.ietf.org/doc/html/rfc7807");

  @ExceptionHandler(IllegalArgumentException.class)
  ProblemDetail onIllegal(IllegalArgumentException ex) {
    var pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
    pd.setTitle("error.invalid-argument");
    pd.setDetail(ex.getMessage());
    pd.setType(TYPE);
    return pd;
  }

  // Specific not-found handling now delegated to @ResponseStatus on ThemeNotFoundException.

  @ExceptionHandler(RuntimeException.class)
  ProblemDetail onGeneric(RuntimeException ex) {
    if (ex instanceof ResponseStatusException rse) {
      throw rse; // already carries status
    }
    ResponseStatus rs = AnnotationUtils.findAnnotation(ex.getClass(), ResponseStatus.class);
    if (rs != null) {
      throw ex; // let Spring translate the annotation (e.g., 404 for ThemeNotFoundException)
    }
    var pd = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    pd.setTitle("error.unexpected");
    pd.setDetail("error.support-contact");
    pd.setType(TYPE);
    return pd;
  }
}
