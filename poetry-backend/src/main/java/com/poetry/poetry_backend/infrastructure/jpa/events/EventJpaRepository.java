/*
 * File: EventJpaRepository.java
 * Purpose: Spring Data JPA repository for Event entities. Custom findNearby
 * uses Haversine formula for geospatial queries. Filters soft-deleted events.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.events;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventJpaRepository extends JpaRepository<EventEntity, Long> {
  @Query(
      "SELECT e FROM EventEntity e WHERE e.deletedAt IS NULL "
          + "AND (6371000 * acos(cos(radians(:latitude)) * cos(radians(e.latitude)) "
          + "* cos(radians(e.longitude) - radians(:longitude)) + sin(radians(:latitude)) "
          + "* sin(radians(e.latitude)))) <= :radiusMeters ORDER BY e.eventDate")
  List<EventEntity> findNearby(
      @Param("latitude") Double latitude,
      @Param("longitude") Double longitude,
      @Param("radiusMeters") Integer radiusMeters);

  @Query("SELECT e FROM EventEntity e WHERE e.deletedAt IS NULL")
  List<EventEntity> findAllNotDeleted();

  @Query("SELECT e FROM EventEntity e WHERE e.deletedAt IS NULL")
  Page<EventEntity> findAllNotDeleted(Pageable pageable);

  @Query("SELECT e FROM EventEntity e WHERE e.userId = :userId AND e.deletedAt IS NULL")
  List<EventEntity> findByUserId(@Param("userId") Long userId);
}
