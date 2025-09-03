/*
 * File: AbstractNotFoundException.java
 * Purpose: Base domain exception for missing aggregate/resources across modules.
 * Provides unified 404 mapping, i18n key derivation and structured metadata for
 * logging and ProblemDetail enrichment. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.shared.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public abstract class AbstractNotFoundException extends RuntimeException {
  private final String resourceName;
  private final String resourceId;

  protected AbstractNotFoundException(String resourceName, String resourceId, String message) {
    super(message);
    this.resourceName = resourceName;
    this.resourceId = resourceId;
  }

  public String getResourceName() { return resourceName; }
  public String getResourceId() { return resourceId; }

  public String getI18nKey() { return "error." + resourceName + ".not-found"; }
}
