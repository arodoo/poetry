/*
 * File: SecurityConfig.java
 * Purpose: Strict default HTTP security for non-test profiles.
 * Exposes only docs and discovery and requires authentication for the API.
 * Method-level security is enabled outside tests to keep controllers lean
 * and to centralize authorization policies at annotations. 
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import com.poetry.poetry_backend.config.auth.AuthProperties;
import com.poetry.poetry_backend.infrastructure.security.JwtAuthFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Profile("!test")
public class SecurityConfig {
  @Bean
  SecurityFilterChain api(
      HttpSecurity http,
      CorsConfigurationSource corsSource,
      AuthProperties props)
      throws Exception {
    http
    .cors(cors -> cors.configurationSource(corsSource))
    .csrf(csrf -> csrf.disable())
    .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    .authorizeHttpRequests(reg -> reg
      .requestMatchers("/v3/api-docs/**", "/v3/api-docs.yaml", "/v3/api-docs", 
          "/swagger-ui/**", "/swagger-ui.html").permitAll()
      .requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
      .requestMatchers(
        "/actuator/**",
        "/api",
        // Newly whitelisted public API endpoints necessary for obtaining tokens
        // or health checks
        "/api/v1/health",
        "/api/v1/auth/login",
        "/api/v1/auth/register",
        "/api/v1/auth/refresh",
        "/api/v1/auth/logout",
        "/api/v1/auth/status",
        "/api/v1/public/forgot-password")
      .permitAll()
      .requestMatchers(HttpMethod.GET,
        "/api/v1/tokens",
        "/api/v1/themes",
        "/api/v1/me/locale",
        "/api/v1/public/landing")
      .permitAll()
      .anyRequest().authenticated())
    // Disable browser basic auth prompt; login is handled by frontend.
    .httpBasic(AbstractHttpConfigurer::disable)
        .formLogin(form -> form.disable());
    http.addFilterBefore(new JwtAuthFilter(props), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
