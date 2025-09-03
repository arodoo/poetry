/*
 * File: ThemeConstants.java
 * Purpose: Default theme data constants for seeding.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme;

public class ThemeConstants {
  public static final String[] DEFAULT_THEMES = new String[]{
    // Format key|name|key=hsl(...),key=hsl(...)
    "default|Default|primary=hsl(243 75% 58%),secondary=hsl(215 20% 50%),accent=hsl(38 92% 54%)," +
    "info=hsl(217 91% 60%),warning=hsl(38 92% 54%),error=hsl(0 84% 60%)," +
    "success=hsl(152 76% 40%),surface=hsl(0 0% 100%),background=hsl(210 40% 98%)," +
    "border=hsl(210 36% 90%),muted=hsl(210 28% 65%),text=hsl(215 32% 17%)",

    "dark|Dark|primary=hsl(239 84% 67%),secondary=hsl(215 28% 28%),accent=hsl(38 92% 54%)," +
    "info=hsl(217 91% 60%),warning=hsl(38 92% 54%),error=hsl(0 84% 60%)," +
    "success=hsl(152 76% 40%),surface=hsl(217 33% 17%),background=hsl(222 47% 11%)," +
    "border=hsl(215 32% 30%),muted=hsl(215 20% 50%),text=hsl(210 40% 96%)",

    "mint|Mint|primary=hsl(158 64% 52%),secondary=hsl(152 76% 40%),accent=hsl(153 47% 56%)," +
    "info=hsl(199 89% 48%),warning=hsl(38 92% 54%),error=hsl(0 72% 51%)," +
    "success=hsl(151 72% 41%),surface=hsl(0 0% 100%),background=hsl(166 76% 93%)," +
    "border=hsl(160 60% 86%),muted=hsl(156 72% 70%),text=hsl(165 100% 15%)",

    "rose|Rose|primary=hsl(332 74% 40%),secondary=hsl(332 73% 47%),accent=hsl(330 81% 60%)," +
    "info=hsl(239 84% 67%),warning=hsl(38 92% 54%),error=hsl(0 72% 51%)," +
    "success=hsl(152 76% 40%),surface=hsl(351 100% 97%),background=hsl(351 100% 95%)," +
    "border=hsl(350 94% 82%),muted=hsl(330 86% 74%),text=hsl(322 69% 27%)",

    "ocean|Ocean|primary=hsl(200 96% 34%),secondary=hsl(199 89% 48%),accent=hsl(199 89% 66%)," +
    "info=hsl(217 91% 60%),warning=hsl(38 92% 54%),error=hsl(0 72% 51%)," +
    "success=hsl(152 76% 40%),surface=hsl(204 100% 97%),background=hsl(204 100% 93%)," +
    "border=hsl(204 94% 82%),muted=hsl(199 95% 70%),text=hsl(205 85% 22%)",

    "amber|Amber|primary=hsl(34 65% 37%),secondary=hsl(32 80% 44%),accent=hsl(38 92% 54%)," +
    "info=hsl(217 91% 60%),warning=hsl(42 96% 61%),error=hsl(0 72% 51%)," +
    "success=hsl(152 76% 40%),surface=hsl(48 100% 96%),background=hsl(45 96% 89%)," +
    "border=hsl(48 96% 85%),muted=hsl(45 92% 70%),text=hsl(32 69% 27%)",

    "slate|Slate|primary=hsl(215 28% 28%),secondary=hsl(215 20% 50%),accent=hsl(215 14% 65%)," +
    "info=hsl(217 91% 60%),warning=hsl(38 92% 54%),error=hsl(0 72% 51%)," +
    "success=hsl(152 76% 40%),surface=hsl(210 40% 96%),background=hsl(210 36% 90%)," +
    "border=hsl(210 32% 80%),muted=hsl(210 28% 65%),text=hsl(215 32% 17%)",

    "forest|Forest|primary=hsl(162 100% 12%),secondary=hsl(163 94% 23%),accent=hsl(158 64% 52%)," +
    "info=hsl(199 89% 48%),warning=hsl(38 92% 54%),error=hsl(0 71% 42%)," +
    "success=hsl(151 72% 41%),surface=hsl(146 52% 96%),background=hsl(141 78% 85%)," +
    "border=hsl(142 76% 83%),muted=hsl(142 76% 70%),text=hsl(165 100% 15%)",

    "purple|Purple|primary=hsl(266 72% 45%),secondary=hsl(262 83% 58%),accent=hsl(260 89% 75%)," +
    "info=hsl(239 84% 67%),warning=hsl(38 92% 54%),error=hsl(0 72% 51%)," +
    "success=hsl(152 76% 40%),surface=hsl(270 60% 96%),background=hsl(261 55% 92%)," +
    "border=hsl(259 67% 90%),muted=hsl(258 69% 81%),text=hsl(266 72% 33%)",

    "mono|Mono|primary=hsl(215 26% 17%),secondary=hsl(215 19% 27%),accent=hsl(215 13% 34%)," +
    "info=hsl(220 9% 46%),warning=hsl(38 92% 54%),error=hsl(0 84% 60%)," +
    "success=hsl(152 76% 40%),surface=hsl(0 0% 100%),background=hsl(210 17% 95%)," +
    "border=hsl(210 16% 87%),muted=hsl(215 11% 65%),text=hsl(215 32% 13%)"
  };
}
