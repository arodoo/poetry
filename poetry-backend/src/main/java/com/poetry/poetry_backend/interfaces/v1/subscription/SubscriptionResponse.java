/*
 * File: SubscriptionResponse.java
 * Purpose: Response DTO for subscription data. Includes name, description,
 * price, currency, duration, features, status, and createdAt.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

import com.poetry.poetry_backend.domain.subscription.model.Subscription;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Subscription response representation")
public record SubscriptionResponse(
        @Schema(description = "Subscription ID", example = "1") Long id,
        @Schema(description = "Plan name", example = "Gold") String name,
        @Schema(description = "Plan description", example = "Premium plan") String description,
        @Schema(description = "Price", example = "29.99") BigDecimal price,
        @Schema(description = "Currency code", example = "USD") String currency,
        @Schema(description = "Duration in days", example = "30") Integer durationDays,
        @Schema(description = "Features", example = "[\"feature1\"]") Set<String> features,
        @Schema(description = "Status", example = "active") String status,
        @Schema(description = "Creation date", example = "2023-01-01T00:00:00Z") Instant createdAt) {

    public static SubscriptionResponse fromDomain(Subscription s) {
        return new SubscriptionResponse(
                s.id(), s.name(), s.description(), s.price(),
                s.currency(), s.durationDays(), s.features(),
                s.status(), s.createdAt());
    }
}
