/*
 * File: FingerprintSlotHistoryEntity.java
 * Purpose: JPA entity for slot assignment audit trail. Indexes on
 * fingerprint_id and user_id for forensic queries. Timestamps track
 * assignment lifecycle. CreationTimestamp auto-sets assignedAt.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.history;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import com.poetry.poetry_backend.domain.fingerprint.model.slot.SlotHistoryReason;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "fingerprint_slot_history",
    indexes = {
      @Index(name = "idx_slot_history_fprint", columnList = "fingerprint_id"),
      @Index(name = "idx_slot_history_user", columnList = "user_id"),
      @Index(name = "idx_slot_history_slot", columnList = "r503_slot_id")
    })
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class FingerprintSlotHistoryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  @Column(name = "fingerprint_id", nullable = false)
  private Long fingerprintId;

  @Column(name = "user_id", nullable = false)
  private Long userId;

  @Column(name = "r503_slot_id", nullable = false)
  private Integer r503SlotId;

  @CreationTimestamp
  @Column(name = "assigned_at", nullable = false, updatable = false)
  private Instant assignedAt;

  @Column(name = "released_at")
  private Instant releasedAt;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 30)
  private SlotHistoryReason reason;

  @Version private Long version;
}
