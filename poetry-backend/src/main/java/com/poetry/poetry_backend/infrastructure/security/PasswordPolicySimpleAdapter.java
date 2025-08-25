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
import com.poetry.poetry_backend.application.auth.port.PasswordPolicyPort;

public class PasswordPolicySimpleAdapter implements PasswordPolicyPort {
  private static final Pattern UPPER = Pattern.compile(".*[A-Z].*");
  private static final Pattern LOWER = Pattern.compile(".*[a-z].*");
  private static final Pattern DIGIT = Pattern.compile(".*[0-9].*");
  private static final Pattern SYMBOL = Pattern.compile(".*[^A-Za-z0-9].*");
  private static final Pattern REPEAT4 = Pattern.compile("(.)\\1{3,}");
  private static final Set<String> BLACKLIST = Set.of(
      "Password123!", "Welcome2024!", "ChangeMe!1");

  public void validate(String raw, String username, String email) {
    if (raw == null || raw.length() < 12)
      throw fail("Password must be at least 12 characters");
    if (!UPPER.matcher(raw).matches())
      throw fail("Missing uppercase letter");
    if (!LOWER.matcher(raw).matches())
      throw fail("Missing lowercase letter");
    if (!DIGIT.matcher(raw).matches())
      throw fail("Missing digit");
    if (!SYMBOL.matcher(raw).matches())
      throw fail("Missing symbol");
    if (REPEAT4.matcher(raw).find())
      throw fail("Too many repeating characters");
    if (BLACKLIST.contains(raw))
      throw fail("Common insecure password");
    if (username != null && raw.toLowerCase().contains(username.toLowerCase()))
      throw fail("Password must not contain username");
    if (email != null) {
      String local = email.split("@")[0];
      if (raw.toLowerCase().contains(local.toLowerCase()))
        throw fail("Password must not contain email local part");
    }
  }

  private PasswordPolicyViolationException fail(String m) {
    return new PasswordPolicyViolationException(m);
  }
}
