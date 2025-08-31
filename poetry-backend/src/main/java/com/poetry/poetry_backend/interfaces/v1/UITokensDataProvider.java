/*
 * File: UITokensDataProvider.java
 * Purpose: Data provider for UI tokens, supplying hardcoded themes,
 * fonts, and customization sets for frontend UI library config.
 * Supports decoupled customization options.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1;

public class UITokensDataProvider {

  public static UITokensDto getTokens() {
    UITokensDto tokens = new UITokensDto();
    tokens.themes = UITokensThemesProvider.getThemes();
    tokens.fonts = UITokensFontsProvider.getFonts();
    tokens.fontSizes = UITokensFontSizesProvider.getFontSizes();
    tokens.spacings = UITokensSpacingsProvider.getSpacings();
    tokens.radius = UITokensRadiusProvider.getRadius();
    tokens.shadows = UITokensShadowsProvider.getShadows();
    tokens.current = UITokensCurrentProvider.getCurrent();
    return tokens;
  }
}
