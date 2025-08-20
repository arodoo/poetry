/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.http;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public final class ETagUtil {
  private ETagUtil() { }

  public static String compute(String canonical) {
    try {
      MessageDigest md = MessageDigest.getInstance("SHA-256");
      byte[] hash = md.digest(canonical.getBytes(StandardCharsets.UTF_8));
      StringBuilder sb = new StringBuilder();
      for (byte b : hash) {
        sb.append(String.format("%02x", b));
      }
      return sb.toString();
    } catch (Exception e) {
      throw new IllegalStateException("ETag compute failure", e);
    }
  }
}
