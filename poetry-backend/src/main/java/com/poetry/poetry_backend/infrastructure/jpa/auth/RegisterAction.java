/*
 * File: RegisterAction.java
 * Purpose: Handles user registration: rate limit, uniqueness checks,
 * password hashing, persistence, initial token issuance and audit.
 * Supports optional idempotency key (currently not persisted) with
 * future extension via adapter. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.exception.DuplicateUserException;
import com.poetry.poetry_backend.application.auth.port.*;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

class RegisterAction {
    private final UserJpaRepository users;
    private final PasswordHasherPort hasher;
    private final TokenGeneratorPort tokens;
    private final RefreshTokenManager manager;
    private final AuditLoggerPort audit;
    private final RateLimiterPort limiter;
    private final TokenResponseFactory factory;

    RegisterAction(UserJpaRepository users, PasswordHasherPort hasher, TokenGeneratorPort tokens,
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

    Map<String, Object> execute(Map<String, Object> payload, String key) {
        limiter.acquire("register:" + key);
        String username = (String) payload.get("username");
        String email = (String) payload.getOrDefault("email", username + "@local");
        String password = (String) payload.getOrDefault("password", "temp");
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("username");
        }
        if (users.existsByUsername(username) || users.existsByEmail(email)) {
            audit.record("register.fail", username, "duplicate");
            throw new DuplicateUserException("duplicate");
        }
        UserEntity u = new UserEntity();
        u.setUsername(username);
        u.setEmail(email);
        u.setPasswordHash(hasher.hash(password));
        u = users.save(u);
        String access = tokens.newAccessToken(username);
        String refresh = manager.issue(u.getId(), null);
        audit.record("register", username, "created");
        return factory.register(username, email, u.getId(), access, refresh);
    }
}
