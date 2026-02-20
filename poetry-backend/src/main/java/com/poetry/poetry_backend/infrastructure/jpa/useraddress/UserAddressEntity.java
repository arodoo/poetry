/*
 * File: UserAddressEntity.java
 * Purpose: JPA entity for the user_addresses table. Related to users
 * only via userId foreign key — no bidirectional coupling.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.useraddress;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_addresses", indexes = {
    @Index(name = "idx_address_user_id",
        columnList = "user_id", unique = true) })
@Getter
@Setter
public class UserAddressEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_id", nullable = false, unique = true)
  private Long userId;

  @Column(length = 200)
  private String line1;

  @Column(length = 200)
  private String line2;

  @Column(length = 100)
  private String city;

  @Column(length = 100)
  private String state;

  @Column(length = 20)
  private String zip;

  @Column(length = 100)
  private String country;
}
