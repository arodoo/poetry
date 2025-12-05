/*
 * File: TokensFingerprintBuilder.java
 * Purpose: Build fingerprint hash for UI tokens payload ETag caching.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.fingerprint;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

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
      // Return a proper weak ETag token. Spring's ResponseEntity#eTag expects the
      // value
      // *without* adding quotes if they are already present. Providing W/"hash" is
      // the
      // canonical weak form per RFC 7232.
      return "W/\"" + hex + "\"";
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException("Missing SHA-256 algorithm", e);
    }
  }
}
