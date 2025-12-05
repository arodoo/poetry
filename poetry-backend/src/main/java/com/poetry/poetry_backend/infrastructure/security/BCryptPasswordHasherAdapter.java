/*
 * File: BCryptPasswordHasherAdapter.java
 * Purpose: Infrastructure adapter implementing PasswordHasherPort using
 * Spring Security's BCryptPasswordEncoder. Encapsulates hashing details and
 * configuration from AuthProperties to provide a stable, testable API for
 * the application and domain layers. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.config.auth.AuthProperties;

public class BCryptPasswordHasherAdapter implements PasswordHasherPort {
    private final BCryptPasswordEncoder encoder;

    public BCryptPasswordHasherAdapter(AuthProperties props) {
        this.encoder = new BCryptPasswordEncoder(props.getBcryptStrength());
    }

    public String hash(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public boolean matches(String rawPassword, String hashedPassword) {
        return encoder.matches(rawPassword, hashedPassword);
    }
}
