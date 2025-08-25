/*
 * File: AuthTestConstants.java
 * Purpose: Single source of truth for authentication test data including
 * usernames, passwords, emails and common test values. Prevents conflicts
 * between test files and ensures consistent test data across all auth
 * test scenarios. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

public final class AuthTestConstants {
  // Prevent instantiation of utility class
  private AuthTestConstants() {}

  // A single strong password reused across users to satisfy policy
  // (>=12, upper, lower, digit, symbol)
  private static final String STRONG = "StrongPass1!X";

  // Basic test user for positive scenarios
  public static final String VALID_USERNAME = "validuser";
  public static final String VALID_PASSWORD = STRONG;
  public static final String VALID_EMAIL = "validuser@test.com";

  // User for login-specific tests
  public static final String LOGIN_USERNAME = "loginuser";
  public static final String LOGIN_PASSWORD = STRONG;
  public static final String LOGIN_EMAIL = "loginuser@test.com";

  // User for registration tests
  public static final String REGISTER_USERNAME = "registeruser";
  public static final String REGISTER_PASSWORD = STRONG;
  public static final String REGISTER_EMAIL = "registeruser@test.com";

  // User for duplicate registration tests
  public static final String DUPLICATE_USERNAME = "duplicateuser";
  public static final String DUPLICATE_PASSWORD = STRONG;
  public static final String DUPLICATE_EMAIL = "duplicateuser@test.com";

  // User for negative login tests
  public static final String INVALID_USERNAME = "invaliduser";
  public static final String INVALID_PASSWORD = "wrongpassword"; // remains intentionally invalid

  // User for refresh token tests
  public static final String REFRESH_USERNAME = "refreshuser";
  public static final String REFRESH_PASSWORD = STRONG;
  public static final String REFRESH_EMAIL = "refreshuser@test.com";

  // User for JWT claims validation tests
  public static final String JWT_USER1 = "jwtuser1";
  public static final String JWT_USER2 = "jwtuser2";
  public static final String JWT_PASSWORD = STRONG;

  // User for audit tests
  public static final String AUDIT_USERNAME = "audituser";
  public static final String AUDIT_PASSWORD = STRONG;
  public static final String AUDIT_EMAIL = "audituser@test.com";

  // Common test values
  public static final String TEST_PASSWORD_SHORT = "x"; // deliberately too short
  public static final String TEST_ISSUER = "poetry-backend";
  public static final int TEST_TOKEN_EXPIRY_SECONDS = 900;

  // Helper method to generate unique usernames for tests that need isolation
  public static String uniqueUsername(String prefix) {
    return prefix + "_" + System.currentTimeMillis();
  }

  // Helper method to generate test email from username
  public static String emailFromUsername(String username) {
    return username + "@test.com";
  }
}
