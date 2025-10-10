/*
 * File: UserTestJson.java
 * Purpose: Helper JSON builders for user tests to keep constants file small.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

public final class UserTestJson {
  private UserTestJson() {}

  public static String createUserJson(
      String firstName,
      String lastName,
      String email,
      String username,
      String password,
      String... roles
  ) {
    String[] effective = roles == null || roles.length == 0
      ? new String[] {"USER"}
      : roles;
    String rolesJson = "[\"" + String.join("\",\"", effective) + "\"]";
    return String.format(
      "{\"firstName\":\"%s\",\"lastName\":\"%s\",\"email\":\"%s\",",
      firstName,
      lastName,
      email
    ) + String.format(
      "\"username\":\"%s\",\"locale\":\"en\",\"password\":\"%s\",\"roles\":%s}",
      username,
      password,
      rolesJson
    );
  }

  public static String updateUserJson(String firstName, String lastName, String email) {
    return String.format(
        "{\"firstName\":\"%s\",\"lastName\":\"%s\",\"email\":\"%s\",",
        firstName,
        lastName,
        email
    ) + String.format(
        "\"locale\":\"en\",\"roles\":[\"USER\"],\"status\":\"active\"}",
        new Object[] {}
    );
  }
}
