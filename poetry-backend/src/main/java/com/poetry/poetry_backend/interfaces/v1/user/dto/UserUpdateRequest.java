/*
 * File: UserUpdateRequest.java
 * Purpose: Request DTO for updating user data. Separates API
 * contract from domain logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user.dto;

import java.time.LocalDate;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User update request")
public record UserUpdateRequest(
    @Schema(description = "First name") String firstName,
    @Schema(description = "Last name") String lastName,
    @Schema(description = "Email address") String email,
    @Schema(description = "Locale code") String locale,
    @Schema(description = "User roles") Set<String> roles,
    @Schema(description = "Status") String status,
    @Schema(description = "Birth date") LocalDate birthDate,
    @Schema(description = "Gender: male, female, other") String gender,
    @Schema(description = "Phone number") String phone,
    @Schema(description = "Address") AddressRequest address) { }
