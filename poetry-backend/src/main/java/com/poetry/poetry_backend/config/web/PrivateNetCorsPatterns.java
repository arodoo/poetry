/*
 * File: PrivateNetCorsPatterns.java
 * Purpose: Builds CORS origin patterns covering all RFC-1918
 * private networks plus localhost. Designed for deployments
 * where the app runs on a LAN with no internet access.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.web;

import java.util.ArrayList;
import java.util.List;

final class PrivateNetCorsPatterns {

  private static final List<String> LAN_PATTERNS = List.of(
    "http://192.168.*:*",
    "http://10.*:*",
    "http://172.[16-31].*:*",
    "http://localhost:*",
    "http://127.0.0.1:*",
    "http://boops.mx",
    "http://boops.mx:*"
  );

  private PrivateNetCorsPatterns() { }

  static List<String> build(List<String> extra) {
    var all = new ArrayList<>(LAN_PATTERNS);
    if (extra != null) all.addAll(extra);
    return List.copyOf(all);
  }
}
