/*
 File: AuthComposition.java
 Purpose: Composition root for authentication related wiring and beans.
 This class exposes beans and adapters necessary to connect the
 authentication application ports with infrastructure implementations.
 Keeping composition isolated helps maintain clear dependency direction
 and simplifies testing of authentication flows. Extended with hashing,
 token generation, clock, audit, rate limiting and properties beans.
 All Rights Reserved. Arodi Emmanuel
*/

package com.poetry.poetry_backend.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.auth.port.*;
import com.poetry.poetry_backend.application.auth.usecase.*;
import com.poetry.poetry_backend.infrastructure.jpa.auth.*;
import com.poetry.poetry_backend.infrastructure.jpa.user.*;
import com.poetry.poetry_backend.infrastructure.memory.auth.*;
import com.poetry.poetry_backend.infrastructure.security.*;

@Configuration
@EnableConfigurationProperties(AuthProperties.class)
public class AuthComposition {
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

  @Bean
  AuditLoggerPort auditLogger() { return new InMemoryAuditLogger(); }

  @Bean
  RateLimiterPort rateLimiter() {
    return new InMemoryTokenBucketRateLimiter(10, 60, 10);
  }

  @Bean
  AuthPort authPort(
      UserJpaRepository userRepo,
      RefreshTokenRepository refreshRepo,
      PasswordHasherPort hasher,
      TokenGeneratorPort tokens,
      ClockPort clock,
      AuditLoggerPort audit,
      RateLimiterPort limiter,
      AuthProperties props) {
    return new JpaAuthAdapter(
        userRepo, refreshRepo, hasher, tokens, clock, audit, limiter, props);
  }

  @Bean
  LoginUseCase loginUseCase(AuthPort a) { return new LoginUseCase(a); }

  @Bean
  RefreshTokenUseCase refreshTokenUseCase(AuthPort a) {
    return new RefreshTokenUseCase(a);
  }

  @Bean
  LogoutUseCase logoutUseCase(AuthPort a) { return new LogoutUseCase(a); }

  @Bean
  RegisterUseCase registerUseCase(AuthPort a) { return new RegisterUseCase(a); }
}
