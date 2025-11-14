/*
 * File: FingerprintEntity.java
 * Purpose: JPA entity for fingerprint enrollment persistence. Maps domain
 * Fingerprint to database with indexed user association and status filtering
 * for efficient verification queries.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintStatus;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "fingerprints",
    indexes = {
      @Index(name = "idx_fingerprints_user", columnList = "user_id"),
      @Index(name = "idx_fingerprints_status", columnList = "status")
    })
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class FingerprintEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  @Column(nullable = false)
  private Long userId;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String templateData;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private FingerprintStatus status = FingerprintStatus.ACTIVE;

  @Column(nullable = false)
  private Instant enrolledAt;

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Instant updatedAt;

  private Instant deletedAt;

  @Version private Long version;
}
