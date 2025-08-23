/*
 * File: LoginAction.java
 * Purpose: Orchestrates login flow: rate limit, credential verify,
 * issue access + refresh tokens, audit success/failure. Keeps
 * JpaAuthAdapter small and testable. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.exception.InvalidCredentialsException;
import com.poetry.poetry_backend.application.auth.port.*;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

class LoginAction {
    private final UserJpaRepository users;
    private final PasswordHasherPort hasher;
    private final TokenGeneratorPort tokens;
    private final RefreshTokenManager manager;
    private final AuditLoggerPort audit;
    private final RateLimiterPort limiter;
    private final TokenResponseFactory factory;

    LoginAction(UserJpaRepository users, PasswordHasherPort hasher, TokenGeneratorPort tokens,
            RefreshTokenManager manager, AuditLoggerPort audit, RateLimiterPort limiter,
            TokenResponseFactory factory) {
        this.users = users;
        this.hasher = hasher;
        this.tokens = tokens;
        this.manager = manager;
        this.audit = audit;
        this.limiter = limiter;
        this.factory = factory;
    }

    Map<String, Object> execute(String username, String password) {
        limiter.acquire("login:" + username);
        UserEntity user = users.findActiveByUsername(username)
                .orElseThrow(() -> fail(username));
        if (!hasher.matches(password, user.getPasswordHash())) {
            throw fail(username);
        }
        String access = tokens.newAccessToken(username);
        String refresh = manager.issue(user.getId(), null);
        audit.record("login.success", username, "issued");
        return factory.tokens(username, access, refresh);
    }

    private InvalidCredentialsException fail(String u) {
        audit.record("login.fail", u, "invalid_credentials");
        return new InvalidCredentialsException("invalid");
    }
}
