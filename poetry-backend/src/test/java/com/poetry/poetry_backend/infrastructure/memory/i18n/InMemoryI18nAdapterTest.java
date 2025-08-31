/*
 * File: InMemoryI18nAdapterTest.java
 * Purpose: Tests adapter fallback and default. This test class verifies
 * the InMemoryI18nAdapter's behavior for message resolution and locale handling.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.i18n;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.context.support.StaticMessageSource;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;

class InMemoryI18nAdapterTest {
  @Test
  void fallsBackToDefault() {
    var ms = new StaticMessageSource();
    ms.addMessage("k", java.util.Locale.ENGLISH, "v");
    AppConfigPort cfg = new AppConfigPort() {
      public String apiBasePath() { return "/"; }
      public List<String> corsAllowedOrigins() { return List.of(); }
      public int idempotencyTtlSeconds() { return 1; }
      public boolean logJson() { return true; }
      public int httpConnectTimeoutMs() { return 1; }
      public int httpReadTimeoutMs() { return 1; }
      public int httpRetryMaxAttempts() { return 1; }
      public int httpRetryBackoffMs() { return 0; }
      public String defaultLocale() { return "en"; }
      public List<String> supportedLocales() { return List.of("en"); }
    };
    var adapter = new InMemoryI18nAdapter(ms, cfg);
    assertEquals("v", adapter.resolve("k", "en"));
    // missing key returns key (code-as-default semantics)
    assertEquals("missing", adapter.resolve("missing", "en"));
  }
}
