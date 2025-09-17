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
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Profile("!test")
public class SecurityConfig {
  @Bean
  SecurityFilterChain api(HttpSecurity http) throws Exception {
    http
    .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(reg -> reg
  .requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
            .requestMatchers(
                "/actuator/**",
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
        "/api")
            .permitAll()
      .requestMatchers(HttpMethod.GET,
        "/api/v1/tokens",
        "/api/v1/me/locale")
      .permitAll()
            .anyRequest().authenticated())
    // Disable browser basic auth prompt; login is handled by frontend.
    .httpBasic(AbstractHttpConfigurer::disable)
        .formLogin(form -> form.disable());
    return http.build();
  }
}
