/*
 * File: SubscriptionsUpdateController.java
 * Purpose: Provide update subscription endpoint with optimistic locking
 * via If-Match ETag header. Delegates to use case and maps DTOs.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.application.subscription.usecase.GetSubscriptionByIdUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.UpdateSubscriptionUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "subscriptions", description = "Subscription plan management")
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionsUpdateController {
  private final UpdateSubscriptionUseCase update;
  private final GetSubscriptionByIdUseCase getSub;
  private final ETagPort etagPort;
  private final ObjectMapper mapper;

  public SubscriptionsUpdateController(
      UpdateSubscriptionUseCase update,
      GetSubscriptionByIdUseCase getSub,
      ETagPort etagPort,
      ObjectMapper mapper) {
    this.update = update;
    this.getSub = getSub;
    this.etagPort = etagPort;
    this.mapper = mapper;
  }

  @Operation(
      operationId = "updateSubscription",
      summary = "Update a subscription",
      description = "Update subscription plan with optimistic locking")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Updated"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden"),
    @ApiResponse(responseCode = "404", description = "Not found"),
    @ApiResponse(responseCode = "412", description = "Precondition Failed")
  })
  @PreAuthorize("hasAuthority('admin')")
  @PutMapping("/{id}")
  public ResponseEntity<SubscriptionDto.SubscriptionResponse> update(
      @PathVariable Long id,
      @RequestHeader("If-Match") String ifMatch,
      @RequestBody SubscriptionDto.SubscriptionUpdateRequest r)
      throws Exception {
    var current = getSub.execute(id);
    long version = current.version();
    var updated = update.execute(
        id, version, r.name(), r.description(), r.price(),
        r.currency(), r.durationDays(), r.features(), r.status());
    var response = SubscriptionDto.toResponse(updated);
    String etag = etagPort.compute(mapper.writeValueAsString(response));
    return ResponseEntity.ok().eTag(etag).body(response);
  }
}
