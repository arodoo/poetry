/*
 * File: UITokensDataProvider.java
 * Purpose: Data provider for UI tokens, delegating theme list to
 * dynamic theme service via injected strategy bean.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import org.springframework.stereotype.Component;

@Component
public class UITokensDataProvider {
  private final UITokensThemesDynamicProvider themesProvider;

  public UITokensDataProvider(UITokensThemesDynamicProvider themesProvider) {
    this.themesProvider = themesProvider;
  }

  public UITokensDto getTokens() {
    UITokensDto tokens = new UITokensDto();
    tokens.themes = themesProvider.getThemes();
    tokens.fonts = UITokensFontsProvider.getFonts();
    tokens.fontSizes = UITokensFontSizesProvider.getFontSizes();
    tokens.spacings = UITokensSpacingsProvider.getSpacings();
    tokens.radius = UITokensRadiusProvider.getRadius();
    tokens.shadows = UITokensShadowsProvider.getShadows();
    tokens.current = UITokensCurrentProvider.getCurrent();
    return tokens;
  }
}
