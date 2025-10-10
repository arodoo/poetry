/*
 * File: SubscriptionsDeleteController.java
 * Purpose: Provide soft-delete subscription endpoint with method security
 * and version validation. Delegates to delete use case.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.subscription.usecase.DeleteSubscriptionUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.GetSubscriptionByIdUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "subscriptions", description = "Subscription plan management")
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionsDeleteController {
  private final DeleteSubscriptionUseCase delete;
  private final GetSubscriptionByIdUseCase getSub;

  public SubscriptionsDeleteController(
      DeleteSubscriptionUseCase delete,
      GetSubscriptionByIdUseCase getSub) {
    this.delete = delete;
    this.getSub = getSub;
  }

  @Operation(
      operationId = "deleteSubscription",
      summary = "Delete a subscription",
      description = "Soft-delete subscription plan by ID")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "204", description = "Deleted"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden"),
    @ApiResponse(responseCode = "404", description = "Not found")
  })
  @PreAuthorize("hasAuthority('admin')")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable Long id) {
    var current = getSub.execute(id);
    delete.execute(id, current.version());
    return ResponseEntity.noContent().build();
  }
}
