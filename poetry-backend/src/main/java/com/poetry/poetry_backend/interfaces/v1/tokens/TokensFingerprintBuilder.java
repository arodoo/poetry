/*
 * File: TokensFingerprintBuilder.java
 * Purpose: Build fingerprint hash for UI tokens payload ETag caching.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

import org.springframework.stereotype.Component;

@Component
public class TokensFingerprintBuilder {
  public String build(UITokensDto dto) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      TokensFingerprintUpdater.updateThemes(digest, dto);
      TokensFingerprintUpdater.updateFonts(digest, dto);
      TokensFingerprintHelpers.updateSimpleList(digest, "fw", dto.fontWeights);
      TokensFingerprintHelpers.updateSets(digest, "fs", dto.fontSizes, s -> s.key, s -> s.sizes);
      TokensFingerprintHelpers.updateSets(digest, "sp", dto.spacings, s -> s.key, s -> s.values);
      TokensFingerprintHelpers.updateSets(digest, "rd", dto.radius, s -> s.key, s -> s.values);
      TokensFingerprintHelpers.updateSets(digest, "sh", dto.shadows, s -> s.key, s -> s.values);
      TokensFingerprintUpdater.updateCurrent(digest, dto);
      String hex = HexFormat.of().formatHex(digest.digest());
      return "W\"" + hex + "\"";
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException("Missing SHA-256 algorithm", e);
    }
  }
}
