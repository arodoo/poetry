/*
 * File: AppPropertiesValidationTest.java
 * Purpose: Unit test to validate application properties binding and
 * validation at startup. Ensures configuration constraints are
 * enforced and provides early feedback for misconfigurations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;

import com.poetry.poetry_backend.infrastructure.config.AppProperties;

class AppPropertiesValidationTest {
  private final ApplicationContextRunner ctx = new ApplicationContextRunner()
      .withUserConfiguration(AppConfigComposition.class)
      .withPropertyValues(
          "app.default-locale=en",
          "app.supported-locales=en,es",
          "app.api-base-path=/api/v1",
          "app.cors-allowed-origins=http://localhost:5173",
          "app.idempotency-ttl-seconds=60",
          "app.log-json=true",
          "app.http-connect-timeout-ms=1000",
          "app.http-read-timeout-ms=2000",
          "app.http-retry-max-attempts=3",
          "app.http-retry-backoff-ms=100");

  @Test
  void binds_and_exposes_port() {
    ctx.run(c -> {
      var p = c.getBean(AppProperties.class);
      assertThat(p.apiBasePath()).isEqualTo("/api/v1");
    });
  }

  @Test
  void fails_on_blank_required_property() {
    var bad = ctx.withPropertyValues("app.api-base-path=");
    bad.run(c -> assertThat(c.getStartupFailure()).isNotNull());
  }
}
