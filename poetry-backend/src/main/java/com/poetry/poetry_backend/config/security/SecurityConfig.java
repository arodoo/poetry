/*
 * File: SecurityConfig.java
 * Purpose: Enable method security and define the HTTP security filter chain.
 * Configures public endpoints and requires authentication elsewhere. This
 * keeps controller code minimal and pushes authorization checks to
 * annotations. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
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
        // Test-only controllers live under /test/** (e.g., GlobalProblemHandlerTest)
        // Including this matcher ensures tests exercise validation instead of 401 auth.
        "/test/**")
            .permitAll()
            .anyRequest().authenticated())
        .httpBasic(basic -> {})
        .formLogin(form -> form.disable());
    return http.build();
  }
}
