/*
 * File: TokensFingerprintHelpers.java
 * Purpose: Utility methods for fingerprint generation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.fingerprint;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Comparator;
import java.util.Map;
import java.util.stream.Collectors;

public class TokensFingerprintHelpers {
  public static <T> void updateSets(MessageDigest d, String ns, java.util.List<T> list,
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

  public static void updateSimpleList(MessageDigest d, String ns, java.util.List<String> list) {
    if (list == null) {
      return;
    }
    put(d, ns + ":" + String.join(",", list));
  }

  public static String mapToString(Map<String, String> map) {
    return map.entrySet().stream()
        .sorted(Map.Entry.comparingByKey())
        .map(e -> e.getKey() + '=' + e.getValue())
        .collect(Collectors.joining(","));
  }

  public static void put(MessageDigest d, String value) {
    d.update(value.getBytes(StandardCharsets.UTF_8));
    d.update((byte) '\n');
  }

  public static String safe(String v) {
    return v == null ? "" : v;
  }
}