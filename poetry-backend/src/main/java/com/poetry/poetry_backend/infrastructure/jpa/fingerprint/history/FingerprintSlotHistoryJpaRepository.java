/*
 * File: FingerprintSlotHistoryJpaRepository.java
 * Purpose: JPA repository for slot assignment audit queries.
 * Enables lookup by fingerprint, user, and active assignments.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.history;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FingerprintSlotHistoryJpaRepository
    extends JpaRepository<FingerprintSlotHistoryEntity, Long> {

  @Query("SELECT h FROM FingerprintSlotHistoryEntity h " + "WHERE h.fingerprintId = :fingerprintId")
  List<FingerprintSlotHistoryEntity> findByFingerprintId(@Param("fingerprintId") Long id);

  @Query("SELECT h FROM FingerprintSlotHistoryEntity h WHERE h.userId = :userId")
  List<FingerprintSlotHistoryEntity> findByUserId(@Param("userId") Long userId);

  @Query("SELECT h FROM FingerprintSlotHistoryEntity h WHERE h.releasedAt IS NULL")
  List<FingerprintSlotHistoryEntity> findActiveAssignments();
}
