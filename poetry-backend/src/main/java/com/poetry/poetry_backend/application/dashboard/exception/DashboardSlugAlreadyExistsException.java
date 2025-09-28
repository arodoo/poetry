/*
 * File: DashboardSlugAlreadyExistsException.java
 * Purpose: Signals slug uniqueness conflicts when persisting dashboards.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DashboardSlugAlreadyExistsException extends RuntimeException {
  public DashboardSlugAlreadyExistsException() {
    super("dashboard.slug.duplicate");
  }
}
