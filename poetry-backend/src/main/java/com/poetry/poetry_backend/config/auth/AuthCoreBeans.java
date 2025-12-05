/*
 * File: AuthCoreBeans.java
 * Purpose: Defines core auth infrastructure beans (hashing, tokens,
 * clock) previously grouped in AuthComposition. Split for line limits
 * and clarity while preserving configuration semantics. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.application.auth.port.support.ClockPort;
import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.infrastructure.memory.auth.support.SystemClockAdapter;
import com.poetry.poetry_backend.infrastructure.security.BCryptPasswordHasherAdapter;
import com.poetry.poetry_backend.infrastructure.security.JwtTokenGeneratorAdapter;

@Configuration
class AuthCoreBeans {
  @Bean
  PasswordHasherPort passwordHasher(AuthProperties p) {
    return new BCryptPasswordHasherAdapter(p);
  }
  @Bean
  TokenGeneratorPort tokenGenerator(AuthProperties p) {
    return new JwtTokenGeneratorAdapter(p);
  }
  @Bean
  ClockPort clockPort() { return new SystemClockAdapter(); }
}
