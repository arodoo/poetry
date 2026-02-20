/*
 * File: AddressRequest.java
 * Purpose: Address block shared by create and update user requests.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Address fields")
public record AddressRequest(
    @Schema(description = "Address line 1") String line1,
    @Schema(description = "Address line 2") String line2,
    @Schema(description = "City") String city,
    @Schema(description = "State or region") String state,
    @Schema(description = "ZIP / postal code") String zip,
    @Schema(description = "Country") String country) { }
