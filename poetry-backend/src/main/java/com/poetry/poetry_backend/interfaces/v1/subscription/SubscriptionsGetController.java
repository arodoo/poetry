/*
 * File: SubscriptionsGetController.java
 * Purpose: Provide get subscription by ID endpoint with method security
 * and ETag support for caching. Keeps controller small and focused.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.application.subscription.usecase.GetSubscriptionByIdUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "subscriptions", description = "Subscription plan management")
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionsGetController {
  private final GetSubscriptionByIdUseCase getById;
  private final ETagPort etagPort;
  private final ObjectMapper mapper;

  public SubscriptionsGetController(
      GetSubscriptionByIdUseCase getById,
      ETagPort etagPort,
      ObjectMapper mapper) {
    this.getById = getById;
    this.etagPort = etagPort;
    this.mapper = mapper;
  }

  @Operation(
      operationId = "getSubscriptionById",
      summary = "Get subscription by ID",
      description = "Retrieve single subscription with ETag for caching")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Subscription found"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden"),
    @ApiResponse(responseCode = "404", description = "Not found")
  })
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping("/{id}")
  public ResponseEntity<SubscriptionDtos.SubscriptionResponse> get(
      @PathVariable Long id) throws Exception {
    var sub = getById.execute(id);
    var response = SubscriptionDtos.toResponse(sub);
    String etag = etagPort.compute(mapper.writeValueAsString(response));
    return ResponseEntity.ok().eTag(etag).body(response);
  }
}
