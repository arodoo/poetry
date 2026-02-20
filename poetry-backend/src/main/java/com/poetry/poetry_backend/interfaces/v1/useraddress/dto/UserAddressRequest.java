/*
 * File: UserAddressRequest.java
 * Purpose: Request DTO for creating or updating user address.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.useraddress.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User address upsert request")
public record UserAddressRequest(
    @Schema(description = "Address line 1", example = "123 Main St")
    String line1,
    @Schema(description = "Address line 2", example = "Apt 4B")
    String line2,
    @Schema(description = "City", example = "New York")
    String city,
    @Schema(description = "State or region", example = "NY")
    String state,
    @Schema(description = "ZIP or postal code", example = "10001")
    String zip,
    @Schema(description = "Country", example = "US")
    String country) {}
