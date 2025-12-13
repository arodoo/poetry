/*
 * File: ThemeDefinition.java
 * Purpose: Record that groups together the essential components of a theme
 * definition: its unique key, display name, and color palette. Used by the
 * theme seeder to create default themes in the database.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.seeder;

import com.poetry.poetry_backend.domain.theme.model.ColorPalette;

/**
 * Immutable definition of a theme for seeding purposes.
 * 
 * @param key    Unique identifier used in URLs and storage (e.g., "dark")
 * @param name   Human-readable display name (e.g., "Dark")
 * @param colors Complete color palette for this theme
 */
public record ThemeDefinition(
        String key,
        String name,
        ColorPalette colors) {
}
