/*
 * File: UserCreateRequest.java
 * Purpose: Request DTO for creating users. Password is required
 * for ADMIN and MANAGER roles, optional for USER role.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user.dto;

import java.time.LocalDate;
import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User creation request")
public record UserCreateRequest(
    @Schema(description = "First name", requiredMode = Schema.RequiredMode.REQUIRED)
    String firstName,
    @Schema(description = "Last name", requiredMode = Schema.RequiredMode.REQUIRED)
    String lastName,
    @Schema(description = "Email address", requiredMode = Schema.RequiredMode.REQUIRED)
    String email,
    @Schema(description = "Username", requiredMode = Schema.RequiredMode.REQUIRED)
    String username,
    @Schema(description = "Locale code", example = "en")
    String locale,
    @Schema(description = "Password (required for ADMIN/MANAGER)")
    String password,
    @Schema(description = "User roles", example = "[\"user\"]")
    Set<String> roles,
    @Schema(description = "Status", example = "active")
    String status,
    @Schema(description = "Birth date") LocalDate birthDate,
    @Schema(description = "Gender: male, female, other") String gender,
    @Schema(description = "Phone number") String phone,
    @Schema(description = "Address") AddressRequest address) { }
