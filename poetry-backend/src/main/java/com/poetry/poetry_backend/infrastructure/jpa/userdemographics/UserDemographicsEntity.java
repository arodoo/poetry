/*
 * File: UserDemographicsEntity.java
 * Purpose: JPA entity for the user_demographics table. Related to users
 * only via userId foreign key — no bidirectional coupling.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.userdemographics;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_demographics", indexes = {
    @Index(name = "idx_demographics_user_id",
        columnList = "user_id", unique = true) })
@Getter
@Setter
public class UserDemographicsEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_id", nullable = false, unique = true)
  private Long userId;

  private LocalDate birthDate;

  @Column(length = 20)
  private String gender;

  @Column(length = 30)
  private String phone;
}
