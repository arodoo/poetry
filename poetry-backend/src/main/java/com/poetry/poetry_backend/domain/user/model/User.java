/*
 * File: User.java
 * Purpose: Domain model representing a user including identity, contact
 * information, username and roles. This model encapsulates domain behavior
 * and invariants that belong to the user aggregate and is referenced across
 * the application and interfaces layers. The class intentionally remains
 * framework agnostic and free of persistence annotations to preserve domain
 * purity.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class User {
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String username;
  private boolean active;
  private Set<String> roles;
}
