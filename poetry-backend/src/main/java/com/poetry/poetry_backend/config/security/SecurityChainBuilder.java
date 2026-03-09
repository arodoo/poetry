/*
 * File: SecurityChainBuilder.java
 * Purpose: Builds the SecurityFilterChain with all authorization
 * rules. In desktop mode, permits every non-API path so the SPA
 * loads without tokens (PathLocaleFilter strips /en/ /es/ before
 * security evaluates, so a wildcard non-API matcher is needed).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.web.cors.CorsConfigurationSource;

import com.poetry.poetry_backend.config.auth.support.AuthProperties;
import com.poetry.poetry_backend.infrastructure.security.JwtAuthFilter;

final class SecurityChainBuilder {

  private final Environment env;

  SecurityChainBuilder(Environment env) {
    this.env = env;
  }

  SecurityFilterChain build(
      HttpSecurity http,
      CorsConfigurationSource corsSource,
      AuthProperties props) throws Exception {
    http
        .cors(c -> c.configurationSource(corsSource))
        .csrf(c -> c.disable())
        .sessionManagement(sm ->
            sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(reg -> {
          if (isDesktop()) {
            reg.requestMatchers(new NegatedRequestMatcher(
                new RegexRequestMatcher("^/api/.*", null)
            )).permitAll();
          }
          PublicEndpoints.configure(reg);
        })
        .httpBasic(AbstractHttpConfigurer::disable)
        .formLogin(f -> f.disable());
    http.addFilterBefore(
        new JwtAuthFilter(props),
        UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  private boolean isDesktop() {
    for (String p : env.getActiveProfiles()) {
      if ("desktop".equals(p)) return true;
    }
    return false;
  }
}
