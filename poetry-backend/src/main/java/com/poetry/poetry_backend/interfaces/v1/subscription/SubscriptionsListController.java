/*
 * File: SubscriptionsListController.java
 * Purpose: Provide list subscriptions endpoint with method security.
 * Delegates to use case and maps to response DTOs. One-responsibility-
 * per-file enforces 60-line limit and improves maintainability.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.subscription.usecase.GetAllSubscriptionsUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "subscriptions", description = "Subscription plan management")
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionsListController {
  private final GetAllSubscriptionsUseCase getAll;

  public SubscriptionsListController(GetAllSubscriptionsUseCase getAll) {
    this.getAll = getAll;
  }

  @Operation(
      operationId = "listSubscriptions",
      summary = "List all subscriptions",
      description = "Retrieve all active subscription plans")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Subscriptions list"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden")
  })
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping
  public ResponseEntity<List<SubscriptionDto.SubscriptionResponse>> all() {
    var subs = getAll.execute();
    var response = subs.stream()
        .map(SubscriptionDto::toResponse)
        .toList();
    return ResponseEntity.ok(response);
  }
}
