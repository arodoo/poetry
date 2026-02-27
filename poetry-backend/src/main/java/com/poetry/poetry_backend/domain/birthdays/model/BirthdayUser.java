/*
 * File: BirthdayUser.java
 * Purpose: Immutable domain record representing a user celebrating a
 * birthday today. Carries only the data needed by the presentation
 * layer, keeping the domain model lean and transport-agnostic.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.birthdays.model;

public record BirthdayUser(String fullName, String username) {}
