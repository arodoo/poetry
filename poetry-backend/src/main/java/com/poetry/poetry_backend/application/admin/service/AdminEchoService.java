/*
 * File: AdminEchoService.java
 * Purpose: Application service implementing admin echo use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.admin.service;

import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.application.admin.usecase.AdminEchoUseCase;

@Service
public class AdminEchoService implements AdminEchoUseCase {
  @Override
  public String execute(String message) {
    if (message == null) throw new IllegalArgumentException("i18n.error.required.message");
    String trimmed = message.trim();
    if (trimmed.isEmpty()) throw new IllegalArgumentException("i18n.error.required.message");
    if (trimmed.length() > 512) throw new IllegalArgumentException("i18n.error.too_long.message");
    return trimmed;
  }
}
