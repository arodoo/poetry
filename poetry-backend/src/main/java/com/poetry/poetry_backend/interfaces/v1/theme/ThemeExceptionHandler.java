/*
 * File: ThemeExceptionHandler.java
 * Purpose: Exception handling for ThemeController.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackageClasses = {ThemeReadController.class, ThemeWriteController.class})
public class ThemeExceptionHandler {

  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler({java.util.NoSuchElementException.class})
  ProblemDetail handleNotFound() {
    // Provide explicit ProblemDetail so it is not intercepted by broader RuntimeException handler.
    ProblemDetail pd = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
    pd.setTitle("error.resource-not-found");
    pd.setDetail("error.resource-not-found");
    return pd;
  }
}
