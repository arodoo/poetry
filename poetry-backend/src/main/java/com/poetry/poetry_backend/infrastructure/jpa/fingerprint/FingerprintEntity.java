/*
 * File: FingerprintEntity.java
 * Purpose: JPA entity for fingerprint enrollment persistence. Maps R503
 * sensor slot IDs to users. Supports archiving: templateBackup stores
 * downloaded template when slot freed, r503SlotId null when archived.
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
      @Index(name = "idx_fingerprints_status", columnList = "status"),
      @Index(name = "idx_fingerprints_slot", columnList = "r503_slot_id")
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

  @Column(name = "r503_slot_id")
  private Integer r503SlotId;

  @Lob
  @Column(name = "template_backup")
  private byte[] templateBackup;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private FingerprintStatus status = FingerprintStatus.ACTIVE;

  @Column(nullable = false)
  private Instant enrolledAt;

  @Column(name = "archived_at")
  private Instant archivedAt;

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Instant updatedAt;

  private Instant deletedAt;

  @Version private Long version;
}
