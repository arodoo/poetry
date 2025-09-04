/*
 * File: FontsFingerprintIgnoredFieldsTest.java
 * Purpose: Ensure changing non-semantic font fields does not alter fingerprint.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.junit.jupiter.api.Assertions.*;

import java.security.MessageDigest;
import java.util.List;

import org.junit.jupiter.api.Test;

class FontsFingerprintIgnoredFieldsTest {
  private String fp(UITokensDto dto) {
    try {
      MessageDigest d = MessageDigest.getInstance("SHA-256");
      TokensFingerprintUpdater.updateFonts(d, dto);
      return java.util.HexFormat.of().formatHex(d.digest());
    } catch (Exception e) { throw new RuntimeException(e); }
  }
  private UITokensDto base() {
    UITokensDto dto = new UITokensDto();
    UITokensDto.Font a = new UITokensDto.Font();
    a.key = "inter";
    a.label = "Inter";
    a.woff2Url = "inter.woff2";
    a.hash = "h1";
    a.weights = List.of(400);
    a.preloadDefault = true;
    UITokensDto.Font b = new UITokensDto.Font();
    b.key = "roboto";
    b.label = "Roboto";
    b.woff2Url = "roboto.woff2";
    b.hash = "h2";
    b.weights = List.of(400);
    b.preloadDefault = false;
    dto.fonts = List.of(a, b);
    return dto;
  }
  @Test
  void changingLabelIgnored() {
    UITokensDto dto = base();
    String before = fp(dto);
    dto.fonts.get(0).label = "Inter UI";
    String after = fp(dto);
    assertEquals(before, after);
  }
  @Test
  void changingUrlIgnored() {
    UITokensDto dto = base();
    String before = fp(dto);
    dto.fonts.get(1).woff2Url = "cdn/roboto.woff2";
    String after = fp(dto);
    assertEquals(before, after);
  }
}
