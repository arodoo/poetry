/*
 * File: UserTestConstants.java
 * Purpose: Single source of truth for user-related test data including
 * emails, usernames, and common test values. Prevents conflicts between
 * test files and ensures consistent test data across all user test
 * scenarios. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

public final class UserTestConstants {
  // Prevent instantiation of utility class
  private UserTestConstants() {}

  private static final String STRONG = "StrongPass1!X";

  // User for UserControllerTest.crud_flow
  public static final String CRUD_USERNAME = "crud-user";
  public static final String CRUD_EMAIL = "crud-user@test.com";
  public static final String CRUD_FIRST_NAME = "CrudFirstName";
  public static final String CRUD_LAST_NAME = "CrudLastName";
  public static final String CRUD_PASSWORD = STRONG;

  // Updated user data for UserControllerTest.crud_flow
  public static final String CRUD_UPDATED_FIRST_NAME = "CrudUpdatedFirst";
  public static final String CRUD_UPDATED_LAST_NAME = "CrudUpdatedLast";
  public static final String CRUD_UPDATED_EMAIL = "crud-updated@test.com";

  // User for IdempotencyKeyTest
  public static final String IDEMPOTENCY_USERNAME = "idempotency-user";
  public static final String IDEMPOTENCY_EMAIL = "idempotency-user@test.com";
  public static final String IDEMPOTENCY_FIRST_NAME = "IdempotencyFirst";
  public static final String IDEMPOTENCY_LAST_NAME = "IdempotencyLast";
  public static final String IDEMPOTENCY_PASSWORD = STRONG;

  // User for ETagAndIfMatchTest
  public static final String ETAG_USERNAME = "etag-user";
  public static final String ETAG_EMAIL = "etag-user@test.com";
  public static final String ETAG_FIRST_NAME = "EtagFirst";
  public static final String ETAG_LAST_NAME = "EtagLast";
  public static final String ETAG_PASSWORD = STRONG;

  // Helper method to generate unique usernames for tests that need isolation
  public static String uniqueUsername(String prefix) {
    return prefix + "_" + System.currentTimeMillis();
  }

  // Helper method to generate test email from username
  public static String emailFromUsername(String username) {
    return username + "@test.com";
  }

  // Helper method to create JSON for user creation
  public static String createUserJson(String firstName, String lastName, String email, 
                                     String username, String password) {
    return String.format(
        "{\"firstName\":\"%s\",\"lastName\":\"%s\",\"email\":\"%s\"," +
        "\"username\":\"%s\",\"password\":\"%s\"}",
        firstName, lastName, email, username, password);
  }

  // Helper method to create JSON for user update
  public static String updateUserJson(String firstName, String lastName, String email) {
    return String.format(
        "{\"firstName\":\"%s\",\"lastName\":\"%s\",\"email\":\"%s\"," +
        "\"roles\":[\"USER\"],\"active\":true}",
        firstName, lastName, email);
  }
}
