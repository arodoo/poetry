/*
 * File: SubscriptionsPagedListController.java
 * Purpose: Provides paginated list of subscriptions endpoint with query
 * params for page, size and search. Delegates to pagination use case and
 * maps results to PageResponseDto for better performance.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.subscription.usecase.GetSubscriptionsPageUseCase;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;
import com.poetry.poetry_backend.interfaces.v1.shared.PageResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "subscriptions", description = "Subscription plan management")
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionsPagedListController {
  private final GetSubscriptionsPageUseCase getPage;

  public SubscriptionsPagedListController(
      GetSubscriptionsPageUseCase getPage) {
    this.getPage = getPage;
  }

  @Operation(
      operationId = "listSubscriptionsPaged",
      summary = "List subscriptions with pagination",
      description = "Retrieve paginated subscription plans with search")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Paged results"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden")
  })
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping("/paged")
  public ResponseEntity<PageResponseDto<SubscriptionDtos.SubscriptionResponse>>
      paged(
          @Parameter(description = "Page number (0-based)")
          @RequestParam(defaultValue = "0") int page,
          @Parameter(description = "Page size")
          @RequestParam(defaultValue = "20") int size,
          @Parameter(description = "Search term")
          @RequestParam(required = false) String search) {
    PageResult<Subscription> result = getPage.execute(page, size, search);
    PageResponseDto<SubscriptionDtos.SubscriptionResponse> response =
        PageResponseDto.from(result, SubscriptionDtos::toResponse);
    return ResponseEntity.ok(response);
  }
}
