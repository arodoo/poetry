/*
 * File: BirthdayUserResponse.java
 * Purpose: API response DTO for a user celebrating a birthday today.
 * Decouples the internal BirthdayUser domain record from the JSON
 * contract served by the controller. Static factory avoids manual
 * field mapping at the call site.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.birthdays.dto;

import com.poetry.poetry_backend.domain.birthdays.model.BirthdayUser;

public record BirthdayUserResponse(String fullName, String username) {
  public static BirthdayUserResponse fromDomain(BirthdayUser u) {
    return new BirthdayUserResponse(u.fullName(), u.username());
  }
}
