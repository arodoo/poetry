/*
 * File: UserEntity.java
 * Purpose: JPA entity representing a user for persistence. It maps domain
 * user attributes to database columns and provides conversion helpers used
 * by JPA adapters. Centralizing the entity keeps persistence concerns
 * separate from domain models and adapters. Extended with password hash
 * storage and unique constraints for production auth flows.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.time.Instant;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_user_username", columnList = "username", unique = true),
    @Index(name = "idx_user_email", columnList = "email", unique = true) })
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String firstName;
  private String lastName;

  @Column(nullable = false)
  private String email;

  @EqualsAndHashCode.Include
  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = true, length = 72)
  private String passwordHash;

  @Column(nullable = false, length = 10)
  private String locale = "en-US";

  @Column(nullable = false, length = 20)
  private String status = "active";

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(
      name = "user_roles",
      joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "role")
  private Set<String> roles;

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Instant updatedAt;

  private Instant deletedAt;

  @Version
  private Long version;
}
