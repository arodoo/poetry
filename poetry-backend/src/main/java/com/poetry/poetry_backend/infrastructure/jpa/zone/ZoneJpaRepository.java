/*
 * File: ZoneJpaRepository.java
 * Purpose: Repository interface for zone persistence used by JPA
 * adapter defining CRUD operations required by application ports while
 * keeping JPA implementation details hidden inside infrastructure layer
 * ensuring clean separation of concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.zone;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ZoneJpaRepository extends JpaRepository<ZoneEntity, Long> {
  @Query("SELECT z FROM ZoneEntity z WHERE z.deletedAt IS NULL ORDER BY z.createdAt DESC")
  List<ZoneEntity> findAllActive();

  @Query("SELECT z FROM ZoneEntity z WHERE z.deletedAt IS NULL ORDER BY z.createdAt DESC")
  Page<ZoneEntity> findAllActive(Pageable pageable);

  @Query(
      "SELECT z FROM ZoneEntity z WHERE z.deletedAt IS NULL "
          + "AND (LOWER(z.name) LIKE LOWER(CONCAT('%', :search, '%')) "
          + "OR LOWER(z.description) LIKE LOWER(CONCAT('%', :search, '%'))) "
          + "ORDER BY z.createdAt DESC")
  Page<ZoneEntity> searchActive(String search, Pageable pageable);

  @Query("SELECT z FROM ZoneEntity z WHERE z.id = :id AND z.deletedAt IS NULL")
  Optional<ZoneEntity> findActiveById(Long id);
}
