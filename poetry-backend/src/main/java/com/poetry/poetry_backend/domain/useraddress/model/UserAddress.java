/*
 * File: UserAddress.java
 * Purpose: Immutable record storing postal address data for a user.
 * Decoupled from the User aggregate; related only via userId foreign key.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.useraddress.model;

public record UserAddress(
    Long id,
    Long userId,
    String line1,
    String line2,
    String city,
    String state,
    String zip,
    String country) {}
