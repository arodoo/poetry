/*
 * File: WebConfig.java
 * Purpose: Web and MVC related configuration for controllers, CORS and
 * response advice such as ETag handling. Provides common web-related
 * beans and mappings used by the HTTP layer to ensure consistent behavior
 * across controllers and exception handling components.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.web;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;

@Configuration
public class WebConfig {
  // Global web configuration lives here.

  @Bean
  CorsConfigurationSource corsSource(AppConfigPort cfg) {
    var c = new CorsConfiguration();
    List<String> o = cfg.corsAllowedOrigins();
    c.setAllowedOrigins(o);
    c.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    c.setAllowedHeaders(List.of("*"));
    c.setExposedHeaders(List.of("ETag", "Content-Type"));
    c.setAllowCredentials(true);
    return request -> c;
  }
}
