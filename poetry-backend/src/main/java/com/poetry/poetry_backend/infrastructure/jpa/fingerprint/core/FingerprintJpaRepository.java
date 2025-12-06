/*
 * File: FingerprintJpaRepository.java
 * Purpose: Spring Data JPA repository for Fingerprint entities with custom
 * queries for active fingerprint lookup and user association filtering.
 * Provides methods to find fingerprints by user ID and status with
 * soft-delete awareness.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

public interface FingerprintJpaRepository
        extends JpaRepository<FingerprintEntity, Long> {

    @Query("SELECT f FROM FingerprintEntity f WHERE f.deletedAt IS NULL")
    List<FingerprintEntity> findAllNotDeleted();

    @Query("SELECT f FROM FingerprintEntity f WHERE f.userId = :userId "
            + "AND f.deletedAt IS NULL")
    List<FingerprintEntity> findByUserId(@Param("userId") Long userId);

    @Query("SELECT f FROM FingerprintEntity f WHERE f.userId = :userId "
            + "AND f.status = :status AND f.deletedAt IS NULL")
    List<FingerprintEntity> findByUserIdAndStatus(
            @Param("userId") Long userId, @Param("status") FingerprintStatus status);

    @Query("SELECT f FROM FingerprintEntity f WHERE f.r503SlotId = :slotId "
            + "AND f.deletedAt IS NULL")
    Optional<FingerprintEntity> findByR503SlotId(
            @Param("slotId") Integer slotId);

    boolean existsByUserId(Long userId);

    @Query("SELECT f FROM FingerprintEntity f WHERE f.status = 'ACTIVE' "
            + "AND f.lastActivityAt < :cutoff AND f.deletedAt IS NULL "
            + "ORDER BY f.lastActivityAt ASC")
    List<FingerprintEntity> findInactiveOlderThan(
            @Param("cutoff") Instant cutoff, Pageable pageable);
}
