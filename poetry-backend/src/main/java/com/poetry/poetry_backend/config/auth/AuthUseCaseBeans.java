/*
 * File: AuthUseCaseBeans.java
 * Purpose: Wires application AuthPort implementation and exposes
 * use case beans (login, refresh, logout, register) kept distinct
 * for testability and file size constraints. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.auth.port.*;
import com.poetry.poetry_backend.application.auth.usecase.*;
import com.poetry.poetry_backend.application.common.port.IdempotencyPort;
import com.poetry.poetry_backend.infrastructure.jpa.auth.*;
import com.poetry.poetry_backend.infrastructure.jpa.auth.repository.RefreshTokenRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

@Configuration
public class AuthUseCaseBeans {
  @Bean
  public AuthPort authPort(
      UserJpaRepository userRepo,
      RefreshTokenRepository refreshRepo,
      PasswordHasherPort hasher,
      TokenGeneratorPort tokens,
      ClockPort clock,
      AuditLoggerPort audit,
      RateLimiterPort limiter,
      AuthProperties props,
      IdempotencyPort idem,
      PasswordPolicyPort policy,
      EmailNormalizerPort emailNormalizer,
      AccountLockoutPort lockout) {
    return new JpaAuthAdapter(userRepo, refreshRepo, hasher, tokens, clock, audit, limiter, props,
        idem, policy, emailNormalizer, lockout);
  }

  @Bean
  public LoginUseCase loginUseCase(AuthPort a) {
    return new LoginUseCase(a);
  }

  @Bean
  public RefreshTokenUseCase refreshTokenUseCase(AuthPort a) {
    return new RefreshTokenUseCase(a);
  }

  @Bean
  public LogoutUseCase logoutUseCase(AuthPort a) {
    return new LogoutUseCase(a);
  }

  @Bean
  public RegisterUseCase registerUseCase(AuthPort a) {
    return new RegisterUseCase(a);
  }
}
