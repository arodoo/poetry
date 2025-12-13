/*
 * File: DarkPalettes.java
 * Purpose: Factory methods providing eye-friendly dark theme color palettes.
 * Based on neuroscience: dark gray surfaces (not pure black), desaturated
 * accent colors, and reduced contrast to prevent eye strain in low light.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.seeder;

import com.poetry.poetry_backend.domain.theme.model.ColorPalette;

/** Factory for ergonomic dark-mode theme palettes (neuroscience-based). */
public final class DarkPalettes {
    private DarkPalettes() {
    }

    /** Night - Deep blue-gray for comfortable evening use. */
    public static ColorPalette dark() {
        return new ColorPalette(
                "hsl(220 40% 60%)", "hsl(220 25% 50%)", "hsl(200 35% 60%)",
                "hsl(200 45% 55%)", "hsl(45 50% 60%)", "hsl(0 50% 60%)",
                "hsl(155 40% 50%)", "hsl(220 15% 18%)", "hsl(220 20% 12%)",
                "hsl(220 15% 28%)", "hsl(220 12% 45%)", "hsl(220 15% 90%)",
                "hsl(220 20% 12%)", "hsl(220 20% 12%)", "hsl(220 15% 90%)",
                "hsl(220 10% 65%)", "hsl(220 10% 55%)", "hsl(0 0% 0%)");
    }

    /** Stone - Neutral gray, minimal and distraction-free. */
    public static ColorPalette slate() {
        return new ColorPalette(
                "hsl(215 25% 55%)", "hsl(215 20% 50%)", "hsl(210 20% 55%)",
                "hsl(210 35% 55%)", "hsl(45 45% 60%)", "hsl(0 45% 58%)",
                "hsl(155 35% 50%)", "hsl(220 10% 20%)", "hsl(220 12% 15%)",
                "hsl(220 10% 30%)", "hsl(215 8% 45%)", "hsl(215 10% 88%)",
                "hsl(220 12% 15%)", "hsl(220 12% 15%)", "hsl(215 10% 88%)",
                "hsl(215 8% 60%)", "hsl(215 6% 50%)", "hsl(0 0% 0%)");
    }

    /** Grove - Dark green tones, restful for extended reading. */
    public static ColorPalette forest() {
        return new ColorPalette(
                "hsl(160 35% 45%)", "hsl(155 30% 40%)", "hsl(165 30% 50%)",
                "hsl(195 40% 55%)", "hsl(45 45% 60%)", "hsl(0 45% 55%)",
                "hsl(155 40% 50%)", "hsl(160 15% 16%)", "hsl(160 18% 12%)",
                "hsl(160 12% 26%)", "hsl(155 12% 40%)", "hsl(155 15% 88%)",
                "hsl(160 18% 12%)", "hsl(160 18% 12%)", "hsl(155 15% 88%)",
                "hsl(155 10% 60%)", "hsl(155 8% 50%)", "hsl(0 0% 0%)");
    }

    /** Dusk - Purple twilight tones, creative and calm. */
    public static ColorPalette purple() {
        return new ColorPalette(
                "hsl(265 35% 55%)", "hsl(260 30% 50%)", "hsl(270 30% 60%)",
                "hsl(210 40% 55%)", "hsl(45 45% 60%)", "hsl(0 45% 58%)",
                "hsl(155 35% 50%)", "hsl(265 15% 17%)", "hsl(265 18% 12%)",
                "hsl(260 12% 27%)", "hsl(260 12% 42%)", "hsl(265 15% 90%)",
                "hsl(265 18% 12%)", "hsl(265 18% 12%)", "hsl(265 15% 90%)",
                "hsl(260 10% 62%)", "hsl(260 8% 52%)", "hsl(0 0% 0%)");
    }

    /** Ink - Minimal monochrome, maximum focus. */
    public static ColorPalette mono() {
        return new ColorPalette(
                "hsl(0 0% 55%)", "hsl(0 0% 50%)", "hsl(0 0% 60%)",
                "hsl(210 20% 55%)", "hsl(45 40% 60%)", "hsl(0 40% 58%)",
                "hsl(155 30% 50%)", "hsl(0 0% 16%)", "hsl(0 0% 11%)",
                "hsl(0 0% 26%)", "hsl(0 0% 42%)", "hsl(0 0% 90%)",
                "hsl(0 0% 11%)", "hsl(0 0% 11%)", "hsl(0 0% 90%)",
                "hsl(0 0% 60%)", "hsl(0 0% 50%)", "hsl(0 0% 0%)");
    }
}
