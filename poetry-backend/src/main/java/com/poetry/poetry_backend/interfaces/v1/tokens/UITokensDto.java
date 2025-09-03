/*
 * File: UITokensDto.java
 * Purpose: DTOs for UI tokens response, including themes, fonts,
 * font sizes, spacings, radius, shadows, and current selections.
 * Supports frontend UI library configuration and customization.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.util.List;
import java.util.Map;

public class UITokensDto {
  public List<Theme> themes;
  public List<Font> fonts;
  public List<FontSizeSet> fontSizes;
  public List<SpacingSet> spacings;
  public List<RadiusSet> radius;
  public List<ShadowSet> shadows;
  public Current current;

  public static class Theme {
    public String key;
    public String label;
    public Map<String, String> colors;
  }

  public static class Font {
    public String key;
    public String label;
    public String woff2Url;
    public List<Integer> weights;
    public String hash;
  }

  public static class FontSizeSet {
    public String key;
    public String label;
    public Map<String, String> sizes;
  }

  public static class SpacingSet {
    public String key;
    public String label;
    public Map<String, String> values;
  }

  public static class RadiusSet {
    public String key;
    public String label;
    public Map<String, String> values;
  }

  public static class ShadowSet {
    public String key;
    public String label;
    public Map<String, String> values;
  }

  public static class Current {
    public String theme;
    public String font;
    public String fontSize;
    public String spacing;
    public String radius;
    public String shadow;
  }
}
