/*
 Web configuration that provides a CORS source based on application
 settings. Allowed origins, methods, and headers are read from the
 AppConfigPort to keep policy centralized. This module stays thin and
 avoids leaking framework code into the core. All Rights Reserved. Arodi
 Emmanuel
*/
package com.poetry.poetry_backend.config;

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
    c.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    c.setAllowedHeaders(List.of("*"));
    return request -> c;
  }
}
