/*
 * File: UserAddressResponse.java
 * Purpose: Response DTO for user address data.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.useraddress.dto;

import com.poetry.poetry_backend.domain.useraddress.model.UserAddress;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User address response")
public record UserAddressResponse(
    @Schema(description = "Record ID") Long id,
    @Schema(description = "User ID") Long userId,
    @Schema(description = "Address line 1") String line1,
    @Schema(description = "Address line 2") String line2,
    @Schema(description = "City") String city,
    @Schema(description = "State or region") String state,
    @Schema(description = "ZIP or postal code") String zip,
    @Schema(description = "Country") String country) {

  public static UserAddressResponse fromDomain(UserAddress a) {
    return new UserAddressResponse(
        a.id(), a.userId(),
        a.line1(), a.line2(),
        a.city(), a.state(),
        a.zip(), a.country());
  }
}
