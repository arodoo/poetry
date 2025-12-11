/*
 * File: PageResult.java
 * Purpose: Generic pagination result domain model. Encapsulates
 * paginated data with metadata including total count, current page
 * number and size. This immutable record ensures type-safe page data
 * transfer between layers following DDD principles.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.shared.model;

import java.util.List;

public record PageResult<T>(
    List<T> content,
    long totalElements,
    int totalPages,
    int currentPage,
    int pageSize) {

  public PageResult {
    if (content == null) {
      throw new IllegalArgumentException("page.result.content.null");
    }
    if (totalElements < 0) {
      throw new IllegalArgumentException("page.result.totalElements.negative");
    }
    if (totalPages < 0) {
      throw new IllegalArgumentException("page.result.totalPages.negative");
    }
    if (currentPage < 0) {
      throw new IllegalArgumentException("page.result.currentPage.negative");
    }
    if (pageSize <= 0) {
      throw new IllegalArgumentException("page.result.pageSize.positive");
    }
  }

  public boolean hasNext() {
    return currentPage < totalPages - 1;
  }

  public boolean hasPrevious() {
    return currentPage > 0;
  }

  public boolean isEmpty() {
    return content.isEmpty();
  }

  public int getNumberOfElements() {
    return content.size();
  }
}
