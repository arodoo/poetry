/*
 * File: FontAssetsFontsProvider.java
 * Purpose: Fonts provider backed by FontAsset JPA storage.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.provider.fonts;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.font.port.FontAssetQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.ports.FontsProviderPort;

@Component
@Primary
public class FontAssetsFontsProvider implements FontsProviderPort {
  private final FontAssetQueryPort fontQuery;

  public FontAssetsFontsProvider(FontAssetQueryPort fontQuery) {
    this.fontQuery = fontQuery;
  }

  @Override
  public List<UITokensDto.Font> getFonts() {
    return fontQuery.findAllActive().stream()
        .map(FontAssetsFontsProvider::map)
        .collect(Collectors.toList());
  }

  private static UITokensDto.Font map(FontAsset a) {
    UITokensDto.Font f = new UITokensDto.Font();
    f.key = a.key();
    f.label = a.label();
    f.woff2Url = a.woff2Url();
    f.weights = a.weights();
    f.hash = a.hash();
    f.preloadDefault = a.preloadDefault();
    f.integrity = a.integrity();
    return f;
  }
}
