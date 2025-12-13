/*
 * File: ThemeConstants.java
 * Purpose: Registry of ergonomic theme definitions based on color psychology
 * and neuroscience principles. All themes designed for reduced eye strain
 * with lower saturation, appropriate contrast, and no pure white/black.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.seeder;

/**
 * Default themes designed for visual comfort and reduced eye strain.
 * Light themes: off-white surfaces, 20-40% saturation accents.
 * Dark themes: dark gray surfaces, desaturated lighter accents.
 */
public final class ThemeConstants {
    private ThemeConstants() {
    }

    /** All ergonomic themes based on neuroscience principles. */
    public static final ThemeDefinition[] DEFAULTS = {
            // Light themes - soft backgrounds, reduced saturation
            new ThemeDefinition("calm", "Calm", LightPalettes.defaultTheme()),
            new ThemeDefinition("sage", "Sage", LightPalettes.mint()),
            new ThemeDefinition("blush", "Blush", LightPalettes.rose()),
            new ThemeDefinition("marine", "Marine", LightPalettes.ocean()),
            new ThemeDefinition("sand", "Sand", LightPalettes.amber()),
            // Dark themes - dark gray surfaces, desaturated accents
            new ThemeDefinition("night", "Night", DarkPalettes.dark()),
            new ThemeDefinition("stone", "Stone", DarkPalettes.slate()),
            new ThemeDefinition("grove", "Grove", DarkPalettes.forest()),
            new ThemeDefinition("dusk", "Dusk", DarkPalettes.purple()),
            new ThemeDefinition("ink", "Ink", DarkPalettes.mono()),
    };
}
