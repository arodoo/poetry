/*
 * File: UserResponse.java
 * Purpose: Response DTO for user data. Decouples internal domain
 * representation from API contract.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.core.User;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User response representation")
public record UserResponse(
    @Schema(description = "User ID") Long id,
    @Schema(description = "First name") String firstName,
    @Schema(description = "Last name") String lastName,
    @Schema(description = "Email address") String email,
    @Schema(description = "Username") String username,
    @Schema(description = "Locale code") String locale,
    @Schema(description = "Status") String status,
    @Schema(description = "User roles") Set<String> roles,
    @Schema(description = "Birth date") LocalDate birthDate,
    @Schema(description = "Gender") String gender,
    @Schema(description = "Phone") String phone,
    @Schema(description = "Address line 1") String addressLine1,
    @Schema(description = "Address line 2") String addressLine2,
    @Schema(description = "City") String addressCity,
    @Schema(description = "State") String addressState,
    @Schema(description = "ZIP code") String addressZip,
    @Schema(description = "Country") String addressCountry,
    @Schema(description = "Creation date") Instant createdAt) {

  public static UserResponse fromDomain(User u) {
    return new UserResponse(
        u.id(), u.firstName(), u.lastName(), u.email(), u.username(),
        u.locale(), u.status(), u.roles(),
        u.birthDate(), u.gender(), u.phone(),
        u.addressLine1(), u.addressLine2(), u.addressCity(),
        u.addressState(), u.addressZip(), u.addressCountry(),
        u.createdAt());
  }
}
