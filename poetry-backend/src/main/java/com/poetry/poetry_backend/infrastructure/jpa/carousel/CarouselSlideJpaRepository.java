/*
 * File: CarouselSlideJpaRepository.java
 * Purpose: Spring Data JPA repository for carousel slide entities.
 * Provides ordered retrieval of all slides and max sort order lookup
 * for appending new slides at the end of the sequence.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.carousel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarouselSlideJpaRepository
    extends JpaRepository<CarouselSlideEntity, Long> {

    List<CarouselSlideEntity> findAllByOrderBySortOrderAsc();

    @Query("SELECT COALESCE(MAX(s.sortOrder), 0) FROM CarouselSlideEntity s")
    int findMaxSortOrder();
}
