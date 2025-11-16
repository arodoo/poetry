/*
 * File: UserFingerprintJpaRepository.java
 * Purpose: Spring Data JPA repository for user_fingerprints table.
 * Provides queries for finding user fingerprints and active associations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserFingerprintJpaRepository
    extends JpaRepository<UserFingerprintEntity, Long> {

  List<UserFingerprintEntity> findByUserId(Long userId);

  @Query(
      "SELECT uf FROM UserFingerprintEntity uf "
          + "WHERE uf.userId = :userId AND uf.isActive = true")
  List<UserFingerprintEntity> findActiveByUserId(Long userId);

  @Query(
      "SELECT uf FROM UserFingerprintEntity uf "
          + "WHERE uf.fingerprintId = :fingerprintId")
  List<UserFingerprintEntity> findByFingerprintId(Long fingerprintId);
}
