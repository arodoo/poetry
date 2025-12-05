/*
 * File: PasswordPolicySimpleAdapter.java
 * Purpose: Implements PasswordPolicyPort with balanced rules: length >=12,
 * requires upper/lower/digit/symbol, disallows 4+ repeated chars and a small
 * blacklist. Designed for extension (breach DB) without changing callers.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.security;

import java.util.Set;
import java.util.regex.Pattern;

import com.poetry.poetry_backend.application.auth.exception.PasswordPolicyViolationException;
import com.poetry.poetry_backend.application.auth.port.security.PasswordPolicyPort;

public class PasswordPolicySimpleAdapter implements PasswordPolicyPort {
  private static final Pattern UPPER = Pattern.compile(".*[A-Z].*");
  private static final Pattern LOWER = Pattern.compile(".*[a-z].*");
  private static final Pattern DIGIT = Pattern.compile(".*[0-9].*");
  private static final Pattern SYMBOL = Pattern.compile(".*[^A-Za-z0-9].*");
  private static final Pattern REPEAT4 = Pattern.compile("(.)\\1{3,}");
  private static final Set<String> BLACKLIST = Set.of(
      "Password123!", "Welcome2024!", "ChangeMe!1");

  public void validate(String raw, String username, String email) {
    if (raw == null || raw.length() < 12) {
      throw fail("auth.password.min_length");
    }
    if (!UPPER.matcher(raw).matches()) {
      throw fail("auth.password.missing_uppercase");
    }
    if (!LOWER.matcher(raw).matches()) {
      throw fail("auth.password.missing_lowercase");
    }
    if (!DIGIT.matcher(raw).matches()) {
      throw fail("auth.password.missing_digit");
    }
    if (!SYMBOL.matcher(raw).matches()) {
      throw fail("auth.password.missing_symbol");
    }
    if (REPEAT4.matcher(raw).find()) {
      throw fail("auth.password.repeat_chars");
    }
    if (BLACKLIST.contains(raw)) {
      throw fail("auth.password.common_insecure");
    }
    if (username != null && raw.toLowerCase().contains(username.toLowerCase())) {
      throw fail("auth.password.contains_username");
    }
    if (email != null) {
      String local = email.split("@")[0];
      if (raw.toLowerCase().contains(local.toLowerCase())) {
        throw fail("auth.password.contains_email_local");
      }
    }
  }

  private PasswordPolicyViolationException fail(String m) {
    return new PasswordPolicyViolationException(m);
  }
}
