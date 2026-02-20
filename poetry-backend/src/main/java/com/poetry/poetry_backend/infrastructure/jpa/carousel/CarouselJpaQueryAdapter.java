/*
 * File: CarouselJpaQueryAdapter.java
 * Purpose: Implements the carousel query port using JPA repositories.
 * Retrieves the carousel configuration singleton and maps slide
 * entities to domain models. Handles default config creation when
 * no configuration row exists in the database yet.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.carousel;

import java.util.List;

import com.poetry.poetry_backend.application.carousel.port.CarouselQueryPort;
import com.poetry.poetry_backend.domain.carousel.exception.SlideNotFoundException;
import com.poetry.poetry_backend.domain.carousel.model.CarouselConfig;
import com.poetry.poetry_backend.domain.carousel.model.CarouselSlide;

public class CarouselJpaQueryAdapter implements CarouselQueryPort {
    private final CarouselSlideJpaRepository slideRepo;
    private final CarouselConfigJpaRepository configRepo;

    public CarouselJpaQueryAdapter(
        CarouselSlideJpaRepository slideRepo,
        CarouselConfigJpaRepository configRepo) {
        this.slideRepo = slideRepo;
        this.configRepo = configRepo;
    }

    @Override
    public CarouselConfig findConfig() {
        var cfg = configRepo.findFirstByOrderByIdAsc()
            .orElseGet(this::createDefault);
        var slides = findAllSlides();
        return new CarouselConfig(
            cfg.getIntervalMs(), cfg.getOverlayFilename(), slides);
    }

    @Override
    public List<CarouselSlide> findAllSlides() {
        return slideRepo.findAllByOrderBySortOrderAsc().stream()
            .map(CarouselJpaMapper::toDomain).toList();
    }

    @Override
    public CarouselSlide findSlideById(Long id) {
        return slideRepo.findById(id)
            .map(CarouselJpaMapper::toDomain)
            .orElseThrow(() -> new SlideNotFoundException(id));
    }

    private CarouselConfigEntity createDefault() {
        var e = new CarouselConfigEntity();
        e.setIntervalMs(5000);
        return configRepo.save(e);
    }
}
