/*
 * File: UserUpdateRequest.java
 * Purpose: Request DTO for updating user data. Separates API
 * contract from domain logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user.dto;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User update request")
public record UserUpdateRequest(
    @Schema(description = "First name", example = "John")
    String firstName,
    @Schema(description = "Last name", example = "Doe")
    String lastName,
    @Schema(description = "Email address", example = "john.doe@example.com")
    String email,
    @Schema(description = "Locale code", example = "en")
    String locale,
    @Schema(description = "User roles", example = "[\"admin\", \"user\"]")
    Set<String> roles,
    @Schema(description = "Status", example = "active")
    String status) { }
