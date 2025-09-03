/*
 * File: TokensFingerprintBuilder.java
 * Purpose: Build a deterministic fingerprint hash for UI tokens payload
 * to support ETag based conditional GET caching on /api/v1/tokens.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Comparator;
import java.util.HexFormat;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class TokensFingerprintBuilder {
  public String build(UITokensDto dto) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      updateThemes(digest, dto);
      updateFonts(digest, dto);
      updateSimpleList(digest, "fw", dto.fontWeights);
      updateSets(digest, "fs", dto.fontSizes, s -> s.key, s -> s.sizes);
      updateSets(digest, "sp", dto.spacings, s -> s.key, s -> s.values);
      updateSets(digest, "rd", dto.radius, s -> s.key, s -> s.values);
      updateSets(digest, "sh", dto.shadows, s -> s.key, s -> s.values);
      updateCurrent(digest, dto);
      String hex = HexFormat.of().formatHex(digest.digest());
      return "W\"" + hex + "\""; // weak ETag
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException("Missing SHA-256 algorithm", e);
    }
  }

  private void updateThemes(MessageDigest d, UITokensDto dto) {
    if (dto.themes == null) {
      return;
    }
    dto.themes.stream().sorted(Comparator.comparing(t -> t.key))
        .forEach(t -> {
          put(d, "th:" + t.key + ":" + t.label);
          if (t.colors != null) {
            put(d, mapToString(t.colors));
          }
        });
  }

  private void updateFonts(MessageDigest d, UITokensDto dto) {
    if (dto.fonts == null) {
      return;
    }
    dto.fonts.stream().sorted(Comparator.comparing(f -> f.key))
        .forEach(f -> {
          put(d, "ft:" + f.key + ":" + f.label + ":" + safe(f.hash));
          if (f.weights != null) {
            put(d, f.weights.stream().sorted().map(Object::toString)
                .collect(Collectors.joining(",")));
          }
        });
  }

  private <T> void updateSets(MessageDigest d, String ns, java.util.List<T> list,
      java.util.function.Function<T, String> keyFn,
      java.util.function.Function<T, Map<String, String>> valuesFn) {
    if (list == null) {
      return;
    }
    list.stream().sorted(Comparator.comparing(keyFn))
        .forEach(s -> {
          put(d, ns + ":" + keyFn.apply(s));
          Map<String, String> values = valuesFn.apply(s);
          if (values != null) {
            put(d, mapToString(values));
          }
        });
  }

  private void updateSimpleList(MessageDigest d, String ns, java.util.List<String> list) {
    if (list == null) {
      return;
    }
    put(d, ns + ":" + String.join(",", list));
  }

  private void updateCurrent(MessageDigest d, UITokensDto dto) {
    if (dto.current == null) {
      return;
    }
    put(d, "cur:" + safe(dto.current.theme) + ":" + safe(dto.current.font)
        + ":" + safe(dto.current.fontSize) + ":" + safe(dto.current.spacing)
        + ":" + safe(dto.current.radius) + ":" + safe(dto.current.shadow));
  }

  private String mapToString(Map<String, String> map) {
    return map.entrySet().stream()
        .sorted(Map.Entry.comparingByKey())
        .map(e -> e.getKey() + '=' + e.getValue())
        .collect(Collectors.joining(","));
  }

  private void put(MessageDigest d, String value) {
    d.update(value.getBytes(StandardCharsets.UTF_8));
    d.update((byte) '\n');
  }

  private String safe(String v) { return v == null ? "" : v; }
}
