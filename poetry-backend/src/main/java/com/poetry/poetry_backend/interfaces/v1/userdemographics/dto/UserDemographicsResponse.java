/*
 * File: UserDemographicsResponse.java
 * Purpose: Response DTO for user demographics data.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.userdemographics.dto;

import java.time.LocalDate;

import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographics;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User demographics response")
public record UserDemographicsResponse(
    @Schema(description = "Record ID") Long id,
    @Schema(description = "User ID") Long userId,
    @Schema(description = "Birth date") LocalDate birthDate,
    @Schema(description = "Gender") String gender,
    @Schema(description = "Phone number") String phone) {

  public static UserDemographicsResponse fromDomain(UserDemographics d) {
    return new UserDemographicsResponse(
        d.id(), d.userId(), d.birthDate(), d.gender(), d.phone());
  }
}
