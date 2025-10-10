/*
 * File: SubscriptionsCreateController.java
 * Purpose: Provide create subscription endpoint with method security.
 * Delegates to use case and maps request/response DTOs.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.subscription.usecase.CreateSubscriptionUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "subscriptions", description = "Subscription plan management")
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionsCreateController {
  private final CreateSubscriptionUseCase create;

  public SubscriptionsCreateController(CreateSubscriptionUseCase create) {
    this.create = create;
  }

  @Operation(
      operationId = "createSubscription",
      summary = "Create a new subscription",
      description = "Create subscription plan with pricing and features")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "201", description = "Created"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden")
  })
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping
  public ResponseEntity<SubscriptionDtos.SubscriptionResponse> create(
      @RequestBody SubscriptionDtos.SubscriptionCreateRequest r) {
    var sub = create.execute(
        r.name(), r.description(), r.price(), r.currency(),
        r.durationDays(), r.features(), r.status());
    return ResponseEntity.status(201)
        .body(SubscriptionDtos.toResponse(sub));
  }
}
