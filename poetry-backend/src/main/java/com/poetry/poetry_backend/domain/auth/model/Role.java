/*
 * File: Role.java
 * Purpose: Stable enum of application roles used for RBAC annotations.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.auth.model;

public enum Role {
  ADMIN("admin", "Admin"),
  MANAGER("manager", "Manager"),
  USER("user", "User");

  private final String key;
  private final String displayName;
  
  Role(String key, String displayName) {
    this.key = key;
    this.displayName = displayName;
  }
  
  public String key() { return key; }
  public String displayName() { return displayName; }
}
