/*
 * File: SecurityConfig.java
 * Purpose: Strict default HTTP security for non-test profiles.
 * Exposes docs/discovery endpoints and requires auth for API.
 * In desktop mode, permits every non-API path so the embedded
 * SPA loads without tokens (PathLocaleFilter strips /en/ /es/
 * before security, so locale-prefixed routes need a wildcard).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import com.poetry.poetry_backend.config.auth.support.AuthProperties;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Profile("!test")
public class SecurityConfig {

  private final Environment env;

  SecurityConfig(Environment env) {
    this.env = env;
  }

  @Bean
  SecurityFilterChain api(
      HttpSecurity http,
      CorsConfigurationSource corsSource,
      AuthProperties props) throws Exception {
    return new SecurityChainBuilder(env)
        .build(http, corsSource, props);
  }

  boolean isDesktop() {
    for (String p : env.getActiveProfiles()) {
      if ("desktop".equals(p)) return true;
    }
    return false;
  }
}
