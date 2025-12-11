/*
 * File: GetUsersPageUseCase.java
 * Purpose: Retrieve paginated users with optional search via query port
 * for efficient list views. Accepts page, size, and search parameters.
 * Returns PageResult with metadata. Centralizes pagination logic.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.model.core.User;

public class GetUsersPageUseCase {
  private final UserQueryPort query;

  public GetUsersPageUseCase(UserQueryPort query) {
    this.query = query;
  }

  public PageResult<User> execute(
      final int page, final int size, final String search) {
    if (page < 0) {
      throw new IllegalArgumentException("page.number.negative");
    }
    if (size < 1 || size > 100) {
      throw new IllegalArgumentException("page.size.invalid");
    }
    String sanitizedSearch = search == null ? "" : search.trim();
    return query.findAllPaged(page, size, sanitizedSearch);
  }
}
