/*
 * File: Role.java
 * Purpose: Stable enum of application roles used for RBAC annotations.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.auth.model;

public enum Role {
  ADMIN("admin"),
  MANAGER("manager"),
  USER("user");

  private final String key;
  Role(String key) { this.key = key; }
  public String key() { return key; }
}
