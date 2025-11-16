/*
 * File: UserFingerprintEntity.java
 * Purpose: JPA entity for user_fingerprints junction table.
 * Maps many-to-many relationship with enrollment metadata.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(
    name = "user_fingerprints",
    indexes = {
      @Index(name = "idx_user_fprints_user", columnList = "user_id"),
      @Index(name = "idx_user_fprints_fprint", columnList = "fingerprint_id")
    })
public class UserFingerprintEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "fingerprint_id", nullable = false)
  private Long fingerprintId;

  @CreationTimestamp
  @Column(name = "enrolled_at", nullable = false, updatable = false)
  private Instant enrolledAt;

  @Column(name = "is_active", nullable = false)
  private boolean isActive;

  @Version
  @Column(name = "version", nullable = false)
  private Long version;

  public UserFingerprintEntity() {}
}
