/*
 * File: LightPalettes.java
 * Purpose: Factory methods providing eye-friendly light theme color palettes.
 * Based on color psychology and neuroscience: reduced saturation (20-40%),
 * off-white surfaces, and soft contrasts to minimize visual fatigue.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.seeder;

import com.poetry.poetry_backend.domain.theme.model.ColorPalette;

/** Factory for ergonomic light-mode theme palettes (neuroscience-based). */
public final class LightPalettes {
    private LightPalettes() {
    }

    /** Calm - Gentle blue-gray tones for focused work. */
    public static ColorPalette defaultTheme() {
        return new ColorPalette(
                "hsl(220 35% 45%)", "hsl(220 20% 55%)", "hsl(200 30% 50%)",
                "hsl(200 40% 50%)", "hsl(40 50% 50%)", "hsl(0 45% 55%)",
                "hsl(150 35% 45%)", "hsl(220 15% 98%)", "hsl(220 15% 95%)",
                "hsl(220 15% 88%)", "hsl(220 10% 65%)", "hsl(220 20% 25%)",
                "hsl(0 0% 100%)", "hsl(0 0% 100%)", "hsl(220 20% 25%)",
                "hsl(220 10% 50%)", "hsl(220 10% 65%)", "hsl(220 20% 15%)");
    }

    /** Sage - Natural green tones, calming and restorative. */
    public static ColorPalette mint() {
        return new ColorPalette(
                "hsl(160 30% 40%)", "hsl(155 25% 50%)", "hsl(165 25% 55%)",
                "hsl(195 35% 50%)", "hsl(45 45% 55%)", "hsl(0 40% 55%)",
                "hsl(155 30% 45%)", "hsl(150 10% 98%)", "hsl(150 12% 95%)",
                "hsl(155 12% 88%)", "hsl(155 15% 65%)", "hsl(160 25% 22%)",
                "hsl(0 0% 100%)", "hsl(0 0% 100%)", "hsl(160 25% 22%)",
                "hsl(155 15% 45%)", "hsl(155 12% 60%)", "hsl(160 20% 15%)");
    }

    /** Blush - Warm rose tones, gentle and welcoming. */
    public static ColorPalette rose() {
        return new ColorPalette(
                "hsl(345 30% 45%)", "hsl(350 25% 55%)", "hsl(340 30% 60%)",
                "hsl(210 35% 50%)", "hsl(40 45% 55%)", "hsl(0 40% 50%)",
                "hsl(155 30% 45%)", "hsl(350 15% 98%)", "hsl(350 12% 95%)",
                "hsl(350 12% 88%)", "hsl(345 15% 70%)", "hsl(350 25% 25%)",
                "hsl(0 0% 100%)", "hsl(0 0% 100%)", "hsl(350 25% 25%)",
                "hsl(345 15% 50%)", "hsl(345 12% 65%)", "hsl(350 20% 15%)");
    }

    /** Marine - Deep blue tones, professional and trustworthy. */
    public static ColorPalette ocean() {
        return new ColorPalette(
                "hsl(210 35% 40%)", "hsl(205 30% 50%)", "hsl(200 30% 55%)",
                "hsl(210 40% 50%)", "hsl(45 45% 55%)", "hsl(0 40% 55%)",
                "hsl(160 30% 45%)", "hsl(210 15% 98%)", "hsl(210 12% 95%)",
                "hsl(210 12% 88%)", "hsl(205 15% 65%)", "hsl(215 25% 22%)",
                "hsl(0 0% 100%)", "hsl(0 0% 100%)", "hsl(215 25% 22%)",
                "hsl(210 15% 45%)", "hsl(210 12% 60%)", "hsl(215 20% 15%)");
    }

    /** Sand - Warm earth tones, grounding and natural. */
    public static ColorPalette amber() {
        return new ColorPalette(
                "hsl(35 35% 40%)", "hsl(40 30% 50%)", "hsl(45 35% 55%)",
                "hsl(210 35% 50%)", "hsl(45 50% 50%)", "hsl(0 40% 55%)",
                "hsl(155 30% 45%)", "hsl(40 20% 97%)", "hsl(40 15% 94%)",
                "hsl(40 15% 87%)", "hsl(35 18% 65%)", "hsl(30 25% 22%)",
                "hsl(0 0% 100%)", "hsl(0 0% 100%)", "hsl(30 25% 22%)",
                "hsl(35 15% 45%)", "hsl(35 12% 60%)", "hsl(30 20% 15%)");
    }
}
