/*
 * File: DashboardNotFoundException.java
 * Purpose: Raised when a dashboard resource cannot be located.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.exception;

import com.poetry.poetry_backend.domain.shared.exception.AbstractNotFoundException;

public class DashboardNotFoundException extends AbstractNotFoundException {
  public DashboardNotFoundException(Long id) {
    super("dashboard", id == null ? "unknown" : String.valueOf(id), "dashboard.not-found");
  }
}
