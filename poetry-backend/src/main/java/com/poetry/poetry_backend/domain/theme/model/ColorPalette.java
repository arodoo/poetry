/*
 * File: ColorPalette.java
 * Purpose: Value Object representing a complete set of color tokens for a
 * theme. Immutable record ensuring type safety and IDE autocompletion for
 * all semantic color values used across the UI. Part of the domain layer.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

/**
 * Immutable value object containing all color tokens for a theme.
 * Each color is stored as an HSL string (e.g., "hsl(243 75% 58%)").
 */
public record ColorPalette(
        String primary,
        String secondary,
        String accent,
        String info,
        String warning,
        String error,
        String success,
        String surface,
        String background,
        String border,
        String muted,
        String text,
        String onPrimary,
        String onSecondary,
        String onSurface,
        String textMuted,
        String textSubtle,
        String overlay) {
    /** Converts this palette to a Map for persistence compatibility. */
    public java.util.Map<String, String> toMap() {
        return java.util.Map.ofEntries(
                java.util.Map.entry("primary", primary),
                java.util.Map.entry("secondary", secondary),
                java.util.Map.entry("accent", accent),
                java.util.Map.entry("info", info),
                java.util.Map.entry("warning", warning),
                java.util.Map.entry("error", error),
                java.util.Map.entry("success", success),
                java.util.Map.entry("surface", surface),
                java.util.Map.entry("background", background),
                java.util.Map.entry("border", border),
                java.util.Map.entry("muted", muted),
                java.util.Map.entry("text", text),
                java.util.Map.entry("onPrimary", onPrimary),
                java.util.Map.entry("onSecondary", onSecondary),
                java.util.Map.entry("onSurface", onSurface),
                java.util.Map.entry("textMuted", textMuted),
                java.util.Map.entry("textSubtle", textSubtle),
                java.util.Map.entry("overlay", overlay));
    }
}
