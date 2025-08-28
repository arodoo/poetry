/*
 * File: ValidationProblemHandler.java
 * Purpose: Handles bean validation exceptions producing RFC7807 problem
 * details with field error map. Extracted from GlobalProblemHandler to
 * satisfy file size and SRP constraints. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.error;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
class ValidationProblemHandler {
  private static final URI TYPE = URI.create(
      "https://datatracker.ietf.org/doc/html/rfc7807");

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ProblemDetail onValidation(MethodArgumentNotValidException ex) {
    var pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
    pd.setTitle("validation.failed");
    Map<String, String> errors = new HashMap<>();
    for (var err : ex.getBindingResult().getAllErrors()) {
      String f = err instanceof FieldError fe ? fe.getField() : err.getObjectName();
      errors.put(f, err.getDefaultMessage());
    }
    pd.setProperty("errors", errors);
    pd.setType(TYPE);
    return pd;
  }
}
