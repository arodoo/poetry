/*
 * File: UITokensDataProvider.java
 * Purpose: Data provider for UI tokens, delegating theme list to
 * dynamic theme service via injected strategy bean.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.provider;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontFamiliesProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontSizesProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontWeightsProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontsProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.RadiusProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.SpacingsProviderPort;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.ThemesProviderPort;

@Component
public class UITokensDataProvider {
  private final ThemesProviderPort themesProvider;
  private final FontsProviderPort fontsProvider;
  private final FontFamiliesProviderPort fontFamiliesProvider;
  private final FontSizesProviderPort fontSizesProvider;
  private final FontWeightsProviderPort fontWeightsProvider;
  private final SpacingsProviderPort spacingsProvider;
  private final RadiusProviderPort radiusProvider;
  private final UITokensCurrentProvider currentProvider;
  private final I18nQueryPort i18nQueryPort;

  public UITokensDataProvider(ThemesProviderPort themesProvider,
      FontsProviderPort fontsProvider, FontFamiliesProviderPort fontFamiliesProvider,
      FontSizesProviderPort fontSizesProvider,
      FontWeightsProviderPort fontWeightsProvider,
      SpacingsProviderPort spacingsProvider,
      RadiusProviderPort radiusProvider,
      UITokensCurrentProvider currentProvider,
      I18nQueryPort i18nQueryPort) {
    this.themesProvider = themesProvider;
    this.fontsProvider = fontsProvider;
    this.fontFamiliesProvider = fontFamiliesProvider;
    this.fontSizesProvider = fontSizesProvider;
    this.fontWeightsProvider = fontWeightsProvider;
    this.spacingsProvider = spacingsProvider;
    this.radiusProvider = radiusProvider;
    this.currentProvider = currentProvider;
    this.i18nQueryPort = i18nQueryPort;
  }

  public UITokensDto getTokens() {
    UITokensDto tokens = new UITokensDto();
    tokens.themes = themesProvider.getThemes();
    tokens.fonts = fontsProvider.getFonts();
    tokens.fontFamilies = fontFamiliesProvider.getFontFamilies();
    tokens.fontSizes = fontSizesProvider.getFontSizes();
    tokens.fontWeights = fontWeightsProvider.getFontWeights();
    tokens.spacings = spacingsProvider.getSpacings();
    tokens.radius = radiusProvider.getRadius();
    tokens.languages = i18nQueryPort.supportedLocales().stream()
        .map(tag -> new UITokensDto.Language(tag, tag.equals("es") ? "Español" : "English"))
        .toList();
    tokens.current = currentProvider.getCurrent(tokens.themes, tokens.fonts,
        tokens.fontSizes, tokens.spacings, tokens.radius);
    return tokens;
  }
}
