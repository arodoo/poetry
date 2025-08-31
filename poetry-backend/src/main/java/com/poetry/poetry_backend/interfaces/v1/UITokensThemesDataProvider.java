/*
 * File: UITokensThemesDataProvider.java
 * Purpose: Data provider for UI themes, supplying color themes
 * for frontend UI library configuration.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class UITokensThemesDataProvider {

  public static List<UITokensDto.Theme> getThemes() {
    return List.of(
      createTheme("default", "Default", new LinkedHashMap<>() {{
        put("primary", "#4f46e5");
        put("secondary", "#64748b");
        put("accent", "#f59e0b");
        put("info", "#3b82f6");
        put("warning", "#f59e0b");
        put("error", "#ef4444");
        put("success", "#10b981");
        put("surface", "#ffffff");
        put("background", "#f8fafc");
        put("border", "#e2e8f0");
        put("muted", "#94a3b8");
        put("text", "#1e293b");
      }})
    );
  }

  private static UITokensDto.Theme createTheme(String key, String label,
      Map<String, String> colors) {
    UITokensDto.Theme theme = new UITokensDto.Theme();
    theme.key = key;
    theme.label = label;
    theme.colors = colors;
    return theme;
  }
}
