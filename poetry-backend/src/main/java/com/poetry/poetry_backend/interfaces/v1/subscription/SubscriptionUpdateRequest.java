/*
 * File: SubscriptionUpdateRequest.java
 * Purpose: DTO for subscription update request.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import java.math.BigDecimal;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Subscription update request")
public record SubscriptionUpdateRequest(
        @Schema(description = "Plan name") String name,
        @Schema(description = "Plan description") String description,
        @Schema(description = "Price") BigDecimal price,
        @Schema(description = "Currency code") String currency,
        @Schema(description = "Duration days") Integer durationDays,
        @Schema(description = "Features") Set<String> features,
        @Schema(description = "Status") String status) {
}
