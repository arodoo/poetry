/*
 * File: DashboardJpaRepository.java
 * Purpose: Spring Data repository for DashboardEntity.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.dashboard;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardJpaRepository extends JpaRepository<DashboardEntity, Long> {
  boolean existsBySlug(String slug);
}
