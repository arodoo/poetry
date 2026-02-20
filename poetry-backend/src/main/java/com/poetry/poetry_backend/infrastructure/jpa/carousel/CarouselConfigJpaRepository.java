/*
 * File: CarouselConfigJpaRepository.java
 * Purpose: Spring Data JPA repository for the carousel configuration entity.
 * Provides access to the singleton configuration row used to store
 * display interval and overlay settings.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.carousel;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarouselConfigJpaRepository
    extends JpaRepository<CarouselConfigEntity, Long> {

    Optional<CarouselConfigEntity> findFirstByOrderByIdAsc();
}
