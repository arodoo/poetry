/*
 * File: JpaAuthAdapter.java
 * Purpose: AuthPort implementation delegating auth operations to
 * focused action classes (login, register, refresh, logout) to satisfy
 * file size and SRP constraints. Keeps wiring of shared dependencies
 * and composition with RefreshTokenManager. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.auth.port.AuthPort;
import com.poetry.poetry_backend.application.auth.port.security.AccountLockoutPort;
import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.application.auth.port.security.PasswordPolicyPort;
import com.poetry.poetry_backend.application.auth.port.security.RateLimiterPort;
import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.support.ClockPort;
import com.poetry.poetry_backend.application.auth.port.support.EmailNormalizerPort;
import com.poetry.poetry_backend.application.auth.port.support.TokenGeneratorPort;
import com.poetry.poetry_backend.application.common.port.IdempotencyPort;
import com.poetry.poetry_backend.config.auth.AuthProperties;
import com.poetry.poetry_backend.infrastructure.jpa.auth.action.LoginAction;
import com.poetry.poetry_backend.infrastructure.jpa.auth.action.LogoutAction;
import com.poetry.poetry_backend.infrastructure.jpa.auth.action.RefreshAction;
import com.poetry.poetry_backend.infrastructure.jpa.auth.action.RegisterAction;
import com.poetry.poetry_backend.infrastructure.jpa.auth.repository.RefreshTokenRepository;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.RefreshTokenManager;
import com.poetry.poetry_backend.infrastructure.jpa.auth.token.TokenResponseFactory;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

@Transactional
public class JpaAuthAdapter implements AuthPort {
  private final LoginAction loginAction;
  private final RegisterAction registerAction;
  private final RefreshAction refreshAction;
  private final LogoutAction logoutAction;

  public JpaAuthAdapter(
      UserJpaRepository users,
      RefreshTokenRepository refreshRepo,
      PasswordHasherPort hasher,
      TokenGeneratorPort tokens,
      ClockPort clock,
      AuditLoggerPort audit,
      RateLimiterPort limiter,
      AuthProperties props,
      IdempotencyPort idempotency,
      PasswordPolicyPort policy,
      EmailNormalizerPort emailNormalizer,
      AccountLockoutPort lockout) {
    var manager = new RefreshTokenManager(refreshRepo, clock, tokens, props, audit);
    var tokenFactory = new TokenResponseFactory(clock, props);
    this.loginAction = new LoginAction(
        users, hasher, tokens, manager, audit, limiter, tokenFactory, lockout);
    this.registerAction = new RegisterAction(
        users, hasher, tokens, manager, audit, limiter, tokenFactory,
        idempotency, policy, emailNormalizer);
    this.refreshAction = new RefreshAction(manager, tokens, users, tokenFactory, limiter);
    this.logoutAction = new LogoutAction(manager, limiter);
  }

  @Override
  public Map<String, Object> login(String u, String p) {
    return loginAction.execute(u, p);
  }

  @Override
  public Map<String, Object> refresh(String r) {
    return refreshAction.execute(r);
  }

  @Override
  public void logout(String r) {
    logoutAction.execute(r);
  }

  @Override
  public Map<String, Object> register(Map<String, Object> p) {
    return register(p, null);
  }

  @Override
  public Map<String, Object> register(Map<String, Object> p, String k) {
    return registerAction.execute(p, k);
  }
}
