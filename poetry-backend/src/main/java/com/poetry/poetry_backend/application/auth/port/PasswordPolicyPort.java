/*
 * File: PasswordPolicyPort.java
 * Purpose: Defines password validation contract enforcing complexity
 * and breach/blacklist checks. Enables interchangeable policy
 * strategies without changing registration logic. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.port;

public interface PasswordPolicyPort {
  void validate(String rawPassword, String username, String email);
}
