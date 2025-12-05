/*
 * File: AuthEntity.java
 * Purpose: JPA entity for Auth aggregate with soft delete flag.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "auth")
public class AuthEntity {
  @Id
  private String id;
  private String username;
  private boolean deleted;

  protected AuthEntity() {
  }

  public AuthEntity(String id, String username, boolean deleted) {
    this.id = id;
    this.username = username;
    this.deleted = deleted;
  }

  public String getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public boolean isDeleted() {
    return deleted;
  }

  public void setUsername(String v) {
    this.username = v;
  }

  public void setDeleted(boolean v) {
    this.deleted = v;
  }
}
