/*
 File: UserEntity.java
 Purpose: JPA entity for persisting users with soft-delete and roles.
   Maps to table 'users' and maintains a separate collection table for
   roles. Equality is based on the unique username to avoid proxy issues.
 All Rights Reserved. Arodi Emmanuel
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
