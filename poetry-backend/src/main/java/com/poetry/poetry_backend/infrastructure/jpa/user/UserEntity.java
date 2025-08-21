/*
 * File: UserEntity.java
 * Purpose: JPA entity representing a user for persistence. It maps domain
 * user attributes to database columns and provides conversion helpers used
 * by JPA adapters. Centralizing the entity keeps persistence concerns
 * separate from domain models and adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.Set;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String firstName;
  private String lastName;
  private String email;

  @EqualsAndHashCode.Include
  @Column(unique = true)
  private String username;

  private boolean active = true;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(
      name = "user_roles",
      joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "role")
  private Set<String> roles;
}
