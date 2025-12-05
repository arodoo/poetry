/*
 * File: PasswordHasherPort.java
 * Purpose: Abstraction for password hashing operations allowing the
 * application layer to remain decoupled from specific cryptographic
 * implementations. Future adapters can plug stronger hashing (e.g. bcrypt)
 * without changing use case logic or tests.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.port.security;

public interface PasswordHasherPort {
  String hash(String rawPassword);
  boolean matches(String rawPassword, String hashedPassword);
}
