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
                "hsl(200 45% 55%)", "hsl(40 95% 60%)", "hsl(0 80% 60%)",
                "hsl(155 40% 50%)", "hsl(220 15% 18%)", "hsl(220 20% 12%)",
                "hsl(220 15% 28%)", "hsl(220 12% 45%)", "hsl(220 15% 90%)",
                "hsl(220 20% 12%)", "hsl(220 20% 12%)", "hsl(220 15% 90%)",
                "hsl(220 10% 65%)", "hsl(220 10% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Stone - Neutral gray, minimal and distraction-free. */
    public static ColorPalette slate() {
        return new ColorPalette(
                "hsl(215 25% 55%)", "hsl(215 20% 50%)", "hsl(210 20% 55%)",
                "hsl(210 35% 55%)", "hsl(40 95% 60%)", "hsl(0 80% 60%)",
                "hsl(155 35% 50%)", "hsl(220 10% 20%)", "hsl(220 12% 15%)",
                "hsl(220 10% 30%)", "hsl(215 8% 45%)", "hsl(215 10% 88%)",
                "hsl(220 12% 15%)", "hsl(220 12% 15%)", "hsl(215 10% 88%)",
                "hsl(215 8% 60%)", "hsl(215 6% 50%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Grove - Dark green tones, restful for extended reading. */
    public static ColorPalette forest() {
        return new ColorPalette(
                "hsl(160 35% 45%)", "hsl(155 30% 40%)", "hsl(165 30% 50%)",
                "hsl(195 40% 55%)", "hsl(40 95% 60%)", "hsl(0 80% 60%)",
                "hsl(155 40% 50%)", "hsl(160 15% 16%)", "hsl(160 18% 12%)",
                "hsl(160 12% 26%)", "hsl(155 12% 40%)", "hsl(155 15% 88%)",
                "hsl(160 18% 12%)", "hsl(160 18% 12%)", "hsl(155 15% 88%)",
                "hsl(155 10% 60%)", "hsl(155 8% 50%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Dusk - Purple twilight tones, creative and calm. */
    public static ColorPalette purple() {
        return new ColorPalette(
                "hsl(265 35% 55%)", "hsl(260 30% 50%)", "hsl(270 30% 60%)",
                "hsl(210 40% 55%)", "hsl(40 95% 60%)", "hsl(0 80% 60%)",
                "hsl(155 35% 50%)", "hsl(265 15% 17%)", "hsl(265 18% 12%)",
                "hsl(260 12% 27%)", "hsl(260 12% 42%)", "hsl(265 15% 90%)",
                "hsl(265 18% 12%)", "hsl(265 18% 12%)", "hsl(265 15% 90%)",
                "hsl(260 10% 62%)", "hsl(260 8% 52%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Ink - Minimal monochrome, maximum focus. */
    public static ColorPalette mono() {
        return new ColorPalette(
                "hsl(0 0% 55%)", "hsl(0 0% 50%)", "hsl(0 0% 60%)",
                "hsl(210 20% 55%)", "hsl(40 90% 60%)", "hsl(0 80% 60%)",
                "hsl(155 30% 50%)", "hsl(0 0% 16%)", "hsl(0 0% 11%)",
                "hsl(0 0% 26%)", "hsl(0 0% 42%)", "hsl(0 0% 90%)",
                "hsl(0 0% 11%)", "hsl(0 0% 11%)", "hsl(0 0% 90%)",
                "hsl(0 0% 60%)", "hsl(0 0% 50%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Midnight - Deep navy with electric blue accents, premium feel. */
    public static ColorPalette midnight() {
        return new ColorPalette(
                "hsl(230 70% 60%)", "hsl(250 50% 50%)", "hsl(200 80% 55%)",
                "hsl(190 80% 50%)", "hsl(45 95% 55%)", "hsl(0 75% 55%)",
                "hsl(160 60% 50%)", "hsl(230 30% 10%)", "hsl(240 25% 8%)",
                "hsl(230 20% 20%)", "hsl(230 15% 45%)", "hsl(220 10% 92%)",
                "hsl(240 25% 8%)", "hsl(240 25% 8%)", "hsl(220 10% 92%)",
                "hsl(230 15% 65%)", "hsl(230 10% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Nebula - Cosmic purple with magenta undertones, dreamy atmosphere. */
    public static ColorPalette nebula() {
        return new ColorPalette(
                "hsl(280 60% 55%)", "hsl(300 50% 50%)", "hsl(320 55% 60%)",
                "hsl(200 70% 55%)", "hsl(40 90% 55%)", "hsl(350 70% 55%)",
                "hsl(170 50% 50%)", "hsl(280 25% 12%)", "hsl(290 20% 9%)",
                "hsl(285 18% 22%)", "hsl(280 12% 50%)", "hsl(280 10% 92%)",
                "hsl(290 20% 9%)", "hsl(290 20% 9%)", "hsl(280 10% 92%)",
                "hsl(285 12% 65%)", "hsl(285 8% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Volcanic - Deep crimson and amber accents on dark surfaces. */
    public static ColorPalette volcanic() {
        return new ColorPalette(
                "hsl(15 75% 50%)", "hsl(25 65% 45%)", "hsl(10 80% 55%)",
                "hsl(200 65% 50%)", "hsl(45 95% 55%)", "hsl(0 80% 50%)",
                "hsl(140 50% 45%)", "hsl(20 25% 10%)", "hsl(15 20% 8%)",
                "hsl(20 18% 18%)", "hsl(15 12% 50%)", "hsl(20 10% 92%)",
                "hsl(15 20% 8%)", "hsl(15 20% 8%)", "hsl(20 10% 92%)",
                "hsl(20 15% 65%)", "hsl(20 10% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Neon - Electric cyan and lime on deep black, cyberpunk vibe. */
    public static ColorPalette neon() {
        return new ColorPalette(
                "hsl(165 100% 50%)", "hsl(280 100% 70%)", "hsl(185 100% 55%)",
                "hsl(200 100% 60%)", "hsl(55 100% 50%)", "hsl(0 100% 60%)",
                "hsl(120 100% 50%)", "hsl(180 30% 8%)", "hsl(170 25% 5%)",
                "hsl(175 25% 15%)", "hsl(170 20% 40%)", "hsl(180 10% 95%)",
                "hsl(170 25% 5%)", "hsl(170 25% 5%)", "hsl(180 10% 95%)",
                "hsl(170 15% 70%)", "hsl(175 10% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Coral - Warm sunset tones on dark, cozy evening feel. */
    public static ColorPalette coral() {
        return new ColorPalette(
                "hsl(340 65% 55%)", "hsl(15 70% 50%)", "hsl(355 60% 55%)",
                "hsl(200 60% 50%)", "hsl(45 90% 50%)", "hsl(0 75% 50%)",
                "hsl(160 45% 45%)", "hsl(350 20% 12%)", "hsl(345 18% 9%)",
                "hsl(348 15% 22%)", "hsl(342 12% 50%)", "hsl(350 10% 92%)",
                "hsl(345 18% 9%)", "hsl(345 18% 9%)", "hsl(350 10% 92%)",
                "hsl(345 12% 65%)", "hsl(340 8% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Aurora - Cool teal and mint greens, fresh and modern. */
    public static ColorPalette aurora() {
        return new ColorPalette(
                "hsl(175 65% 45%)", "hsl(185 55% 40%)", "hsl(165 60% 50%)",
                "hsl(200 55% 50%)", "hsl(50 95% 55%)", "hsl(0 80% 55%)",
                "hsl(145 55% 45%)", "hsl(175 25% 12%)", "hsl(180 20% 9%)",
                "hsl(178 18% 22%)", "hsl(172 12% 50%)", "hsl(175 10% 92%)",
                "hsl(180 20% 9%)", "hsl(180 20% 9%)", "hsl(175 10% 92%)",
                "hsl(175 12% 65%)", "hsl(172 8% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Abyss - Ocean depths, deep blues and navy. */
    public static ColorPalette abyss() {
        return new ColorPalette(
                "hsl(210 70% 45%)", "hsl(220 60% 40%)", "hsl(195 75% 50%)",
                "hsl(185 80% 45%)", "hsl(40 90% 50%)", "hsl(0 70% 50%)",
                "hsl(180 50% 40%)", "hsl(220 40% 8%)", "hsl(230 35% 6%)",
                "hsl(225 30% 15%)", "hsl(218 20% 40%)", "hsl(210 10% 92%)",
                "hsl(230 35% 6%)", "hsl(230 35% 6%)", "hsl(210 10% 92%)",
                "hsl(218 15% 60%)", "hsl(220 10% 50%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Ember - Warm amber and orange on dark, firelight glow. */
    public static ColorPalette ember() {
        return new ColorPalette(
                "hsl(30 85% 55%)", "hsl(20 75% 50%)", "hsl(40 80% 55%)",
                "hsl(200 55% 50%)", "hsl(55 100% 55%)", "hsl(0 80% 55%)",
                "hsl(150 45% 40%)", "hsl(25 30% 10%)", "hsl(20 25% 8%)",
                "hsl(22 22% 18%)", "hsl(25 15% 50%)", "hsl(25 10% 92%)",
                "hsl(20 25% 8%)", "hsl(20 25% 8%)", "hsl(25 10% 92%)",
                "hsl(28 15% 65%)", "hsl(25 10% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }

    /** Twilight - Soft lavender and rose on dark, elegant evening. */
    public static ColorPalette twilight() {
        return new ColorPalette(
                "hsl(290 50% 55%)", "hsl(310 45% 50%)", "hsl(270 55% 60%)",
                "hsl(200 50% 50%)", "hsl(45 85% 50%)", "hsl(0 70% 50%)",
                "hsl(160 40% 45%)", "hsl(280 25% 12%)", "hsl(285 20% 9%)",
                "hsl(282 18% 22%)", "hsl(278 12% 50%)", "hsl(285 10% 92%)",
                "hsl(285 20% 9%)", "hsl(285 20% 9%)", "hsl(285 10% 92%)",
                "hsl(280 12% 65%)", "hsl(278 8% 55%)", "hsl(0 0% 0%)", "hsl(0 0% 0%)");
    }
}
