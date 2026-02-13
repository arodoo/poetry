/*
 * File: SubscriptionCreateRequest.java
 * Purpose: DTO for subscription creation request.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.subscription;

import java.math.BigDecimal;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Subscription creation request")
public record SubscriptionCreateRequest(
        @Schema(description = "Plan name", requiredMode = Schema.RequiredMode.REQUIRED) String name,
        @Schema(description = "Plan description") String description,
        @Schema(description = "Price", requiredMode = Schema.RequiredMode.REQUIRED) BigDecimal price,
        @Schema(description = "Currency code") String currency,
        @Schema(description = "Duration days", requiredMode = Schema.RequiredMode.REQUIRED) Integer durationDays,
        @Schema(description = "Features") Set<String> features,
        @Schema(description = "Status") String status) {
}
