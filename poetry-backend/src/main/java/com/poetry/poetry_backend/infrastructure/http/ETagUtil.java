/*
 File: ETagUtil.java
 Purpose: Utility to compute ETag values using SHA-256 hashing. This class
 encapsulates the low-level digest computation and formatting needed by
 adapters and response advice to generate stable ETag strings. Keeping the
 algorithm here centralizes changes and avoids scattering cryptographic
 details across the codebase.
 All Rights Reserved. Arodi Emmanuel
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
