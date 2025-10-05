/*
 * File: PageResponseDto.java
 * Purpose: Generic paginated response DTO for REST endpoints. Wraps
 * content list with pagination metadata (totalElements, totalPages,
 * currentPage, size) matching Spring Data Page semantics. Provides
 * consistent pagination structure across all API endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.shared;

import java.util.List;

import com.poetry.poetry_backend.domain.shared.model.PageResult;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Paginated response wrapper")
public record PageResponseDto<T>(
    @Schema(description = "Page content")
    List<T> content,
    @Schema(description = "Total number of elements", example = "50")
    long totalElements,
    @Schema(description = "Total number of pages", example = "5")
    int totalPages,
    @Schema(description = "Current page number (0-indexed)", example = "0")
    int currentPage,
    @Schema(description = "Page size", example = "10")
    int pageSize,
    @Schema(description = "Has next page", example = "true")
    boolean hasNext,
    @Schema(description = "Has previous page", example = "false")
    boolean hasPrevious) {

  public static <T, D> PageResponseDto<D> from(
      PageResult<T> pageResult,
      java.util.function.Function<T, D> mapper) {
    List<D> dtos =
        pageResult.content().stream().map(mapper).toList();
    return new PageResponseDto<>(
        dtos,
        pageResult.totalElements(),
        pageResult.totalPages(),
        pageResult.currentPage(),
        pageResult.pageSize(),
        pageResult.hasNext(),
        pageResult.hasPrevious());
  }
}
