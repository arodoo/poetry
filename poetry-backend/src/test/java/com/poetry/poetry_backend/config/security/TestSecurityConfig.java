/*
 * File: TestSecurityConfig.java
 * Purpose: Permissive HTTP security for tests only to isolate business behavior.
 * It allows reaching test controllers and v1 endpoints without authentication
 * so tests validate functional outcomes instead of security concerns. The
 * configuration is guarded behind the "test" Spring profile to avoid leaking
 * into production. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@Profile("test")
public class TestSecurityConfig {
  @Bean
  SecurityFilterChain api(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(reg -> reg
            .requestMatchers(
                "/actuator/**",
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/api",
                "/api/v1/**",
                "/test/**")
            .permitAll()
            .anyRequest().authenticated())
        .httpBasic(basic -> {})
        .formLogin(form -> form.disable());
    return http.build();
  }
}
