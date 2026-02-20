/*
 * File: UserDemographics.java
 * Purpose: Immutable record storing biographical and contact data for a user.
 * Decoupled from the User aggregate; related only via userId foreign key.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.userdemographics.model;

import java.time.LocalDate;

public record UserDemographics(
    Long id,
    Long userId,
    LocalDate birthDate,
    String gender,
    String phone) {}
