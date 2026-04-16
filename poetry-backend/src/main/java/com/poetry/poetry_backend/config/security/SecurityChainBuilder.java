/*
 * File: SecurityChainBuilder.java
 * Purpose: Builds the SecurityFilterChain with all authorization
 * rules. Permits every non-API path so the embedded SPA loads
 * without tokens. API routes require JWT authentication.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

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
          reg.requestMatchers(new NegatedRequestMatcher(
              new RegexRequestMatcher("^/api/.*", null)
          )).permitAll();
          PublicEndpoints.configure(reg);
        })
        .httpBasic(AbstractHttpConfigurer::disable)
        .formLogin(f -> f.disable());
    http.addFilterBefore(
        new JwtAuthFilter(props),
        UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
