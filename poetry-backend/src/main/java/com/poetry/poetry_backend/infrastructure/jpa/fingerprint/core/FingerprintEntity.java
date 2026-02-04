/*
 * File: FingerprintEntity.java
 * Purpose: JPA entity for fingerprint enrollment persistence. 
 * Stores FMD (Base64) for HID Digital Persona readers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "fingerprints", indexes = {
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

  @Lob
  @Column(name = "fmd")
  private String fmd;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private FingerprintStatus status = FingerprintStatus.ACTIVE;

  @Column(nullable = false)
  private Instant enrolledAt;

  @Column(name = "archived_at")
  private Instant archivedAt;

  @Column(name = "last_activity_at")
  private Instant lastActivityAt;

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
