/*
 * File: SubscriptionDto.java
 * Purpose: DTO classes for subscription endpoints representing request and
 * response payloads independently from domain model. Enables clear API
 * contracts and versioning at the boundary.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import java.math.BigDecimal;
import java.util.Set;

import com.poetry.poetry_backend.domain.subscription.model.Subscription;

import io.swagger.v3.oas.annotations.media.Schema;

public final class SubscriptionDto {
  @Schema(description = "Subscription response representation")
  public record SubscriptionResponse(
      @Schema(description = "Subscription ID", example = "1")
      Long id,
      @Schema(description = "Plan name", example = "Gold")
      String name,
      @Schema(description = "Plan description", example = "Premium plan")
      String description,
      @Schema(description = "Price", example = "29.99")
      BigDecimal price,
      @Schema(description = "Currency code", example = "USD")
      String currency,
      @Schema(description = "Duration in days", example = "30")
      Integer durationDays,
      @Schema(description = "Features", example = "[\"feature1\"]")
      Set<String> features,
      @Schema(description = "Status", example = "active")
      String status) { }

  @Schema(description = "Subscription update request")
  public record SubscriptionUpdateRequest(
      @Schema(description = "Plan name", example = "Gold")
      String name,
      @Schema(description = "Plan description", example = "Premium plan")
      String description,
      @Schema(description = "Price", example = "29.99")
      BigDecimal price,
      @Schema(description = "Currency code", example = "USD")
      String currency,
      @Schema(description = "Duration in days", example = "30")
      Integer durationDays,
      @Schema(description = "Features")
      Set<String> features,
      @Schema(description = "Status", example = "active")
      String status) { }

  @Schema(description = "Subscription creation request")
  public record SubscriptionCreateRequest(
      @Schema(description = "Plan name", example = "Gold", requiredMode = Schema.RequiredMode.REQUIRED)
      String name,
      @Schema(description = "Plan description", example = "Premium plan")
      String description,
      @Schema(description = "Price", example = "29.99", requiredMode = Schema.RequiredMode.REQUIRED)
      BigDecimal price,
      @Schema(description = "Currency code", example = "USD")
      String currency,
      @Schema(description = "Duration in days", example = "30", requiredMode = Schema.RequiredMode.REQUIRED)
      Integer durationDays,
      @Schema(description = "Features")
      Set<String> features,
      @Schema(description = "Status", example = "active")
      String status) { }

  public static SubscriptionResponse toResponse(Subscription s) {
    return new SubscriptionResponse(
        s.id(), s.name(), s.description(), s.price(),
        s.currency(), s.durationDays(), s.features(), s.status());
  }
}
