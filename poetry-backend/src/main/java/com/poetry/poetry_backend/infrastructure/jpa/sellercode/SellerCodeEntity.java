/*
 * File: SellerCodeEntity.java
 * Purpose: JPA entity representing seller code for persistence mapping domain
 * attributes to database columns providing conversion helpers for JPA adapters.
 * Centralizes persistence concerns separate from domain models ensuring clean
 * separation between infrastructure and domain layers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "seller_codes",
    indexes = {@Index(name = "idx_code", columnList = "code", unique = true)})
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SellerCodeEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @EqualsAndHashCode.Include
  @Column(nullable = false, unique = true, length = 100)
  private String code;

  @Column(nullable = false, length = 100)
  private String organizationId;

  @Column(nullable = false, length = 20)
  private String status;

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
