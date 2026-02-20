/*
 * File: UserDemographicsRequest.java
 * Purpose: Request DTO for creating or updating user demographics.
 * All fields are optional to allow partial updates.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.userdemographics.dto;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User demographics upsert request")
public record UserDemographicsRequest(
    @Schema(description = "Birth date", example = "1990-05-20")
    LocalDate birthDate,
    @Schema(description = "Gender (female, male, other)", example = "female")
    String gender,
    @Schema(description = "Phone number", example = "+1 555 000 0000")
    String phone) {}
