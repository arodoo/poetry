/*
 * File: UsersPagedListController.java
 * Purpose: Provides paginated list of users endpoint with query params
 * for page and size. Delegates to pagination use case and maps results
 * to PageResponseDto. Enforces one-responsibility-per-file and improves
 * performance by avoiding full table scans.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.GetUsersPageUseCase;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.model.User;
import com.poetry.poetry_backend.interfaces.v1.shared.PageResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "users", description = "User management")
@RestController
@RequestMapping("/api/v1/users")
public class UsersPagedListController {
  private final GetUsersPageUseCase getPage;

  public UsersPagedListController(GetUsersPageUseCase getPage) {
    this.getPage = getPage;
  }

  @Operation(
      operationId = "listUsersPaged",
      summary = "List users with pagination",
      description = "Retrieve users page-by-page for performance")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Users page"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden"),
        @ApiResponse(responseCode = "400", description = "Invalid page params")
      })
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping(path = "/paged")
  public ResponseEntity<PageResponseDto<UserResponse>> paged(
      @Parameter(description = "Page number", example = "0")
      @RequestParam(defaultValue = "0") int page,
      @Parameter(description = "Page size", example = "10")
      @RequestParam(defaultValue = "10") int size,
      @Parameter(description = "Search term", example = "john")
      @RequestParam(required = false) String search) {
    PageResult<User> result = getPage.execute(page, size, search);
    PageResponseDto<UserResponse> response =
  PageResponseDto.from(result, UserDto::toResponse);
    return ResponseEntity.ok(response);
  }
}
