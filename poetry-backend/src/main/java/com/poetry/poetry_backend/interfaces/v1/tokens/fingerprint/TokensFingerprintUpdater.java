/*
 * File: TokensFingerprintUpdater.java
 * Purpose: Helper class for updating fingerprint digest with token data.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.fingerprint;

import java.security.MessageDigest;
import java.util.Comparator;
import java.util.stream.Collectors;

import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

public class TokensFingerprintUpdater {
  public static void updateThemes(MessageDigest d, UITokensDto dto) {
    if (dto.themes == null) {
      return;
    }
    dto.themes.stream().sorted(Comparator.comparing(t -> t.key))
        .forEach(t -> {
          TokensFingerprintHelpers.put(d, "th:" + t.key + ":" + t.label);
          if (t.colors != null) {
            TokensFingerprintHelpers.put(d, TokensFingerprintHelpers.mapToString(t.colors));
          }
        });
  }

  public static void updateFonts(MessageDigest d, UITokensDto dto) {
    if (dto.fonts == null) {
      return;
    }
    dto.fonts.stream().sorted(Comparator.comparing(f -> f.key))
        .forEach(f -> {
          String fontKey = "ft:" + f.key + ":" +
              TokensFingerprintHelpers.safe(f.hash) + ":pd=" + (f.preloadDefault ? "1" : "0");
          TokensFingerprintHelpers.put(d, fontKey);
          if (f.weights != null) {
            TokensFingerprintHelpers.put(d, f.weights.stream().sorted().map(Object::toString)
                .collect(Collectors.joining(",")));
          }
        });
  }

  public static void updateCurrent(MessageDigest d, UITokensDto dto) {
    if (dto.current == null) {
      return;
    }
    String currentKey = "cur:" + TokensFingerprintHelpers.safe(dto.current.theme) + ":" +
        TokensFingerprintHelpers.safe(dto.current.font) + ":" +
        TokensFingerprintHelpers.safe(dto.current.fontSize) + ":" +
        TokensFingerprintHelpers.safe(dto.current.spacing) + ":" +
        TokensFingerprintHelpers.safe(dto.current.radius) + ":" +
        TokensFingerprintHelpers.safe(dto.current.shadow);
    TokensFingerprintHelpers.put(d, currentKey);
  }
}