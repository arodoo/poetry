/*
 * File: PublicEndpoints.java
 * Purpose: Centralises the list of API endpoints that do not
 * require authentication. Extracted from SecurityConfig so both
 * the main chain builder and tests can share the same rules
 * without duplicating long matcher lists.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;

final class PublicEndpoints {

  private PublicEndpoints() { }

  @SuppressWarnings("rawtypes")
  static void configure(
      AuthorizeHttpRequestsConfigurer<HttpSecurity>
          .AuthorizationManagerRequestMatcherRegistry reg) {
    reg.requestMatchers(
            "/v3/api-docs/**", "/v3/api-docs.yaml",
            "/v3/api-docs",
            "/swagger-ui/**", "/swagger-ui.html")
        .permitAll()
        .requestMatchers(HttpMethod.OPTIONS, "/api/**")
        .permitAll()
        .requestMatchers(
            "/actuator/**", "/api",
            "/api/v1/health",
            "/api/v1/auth/login",
            "/api/v1/auth/register",
            "/api/v1/auth/refresh",
            "/api/v1/auth/logout",
            "/api/v1/auth/status",
            "/api/v1/public/forgot-password",
            "/api/v1/fingerprints/verify",
            "/ws/fingerprint")
        .permitAll()
        .requestMatchers(HttpMethod.GET,
            "/api/v1/tokens", "/api/v1/themes",
            "/api/v1/me/locale",
            "/api/v1/public/landing",
            "/api/v1/carousel/config",
            "/api/v1/carousel/media/**")
        .permitAll()
        .anyRequest().authenticated();
  }
}
