/*
 * File: AutoBackupJpaRepository.java
 * Purpose: JPA repository for auto backup records.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.autobackup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutoBackupJpaRepository extends JpaRepository<AutoBackupEntity, Long> {

  Page<AutoBackupEntity> findAllByOrderByGeneratedAtDesc(Pageable pageable);

  Page<AutoBackupEntity> findByFileNameContainingIgnoreCase(
      String search, Pageable pageable);
}
