/*
 * File: CarouselJpaCommandAdapter.java
 * Purpose: Implements the carousel command port using JPA repositories.
 * Handles creation, deletion and reordering of slides as well as
 * updating configuration settings like interval and overlay.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.carousel;

import java.util.List;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;
import com.poetry.poetry_backend.domain.carousel.exception.SlideNotFoundException;
import com.poetry.poetry_backend.domain.carousel.model.CarouselSlide;
import com.poetry.poetry_backend.domain.carousel.model.SlideType;

public class CarouselJpaCommandAdapter implements CarouselCommandPort {
    private final CarouselSlideJpaRepository slideRepo;
    private final CarouselConfigJpaRepository configRepo;

    public CarouselJpaCommandAdapter(
        CarouselSlideJpaRepository slideRepo,
        CarouselConfigJpaRepository configRepo) {
        this.slideRepo = slideRepo;
        this.configRepo = configRepo;
    }

    @Override
    public CarouselSlide addSlide(
        SlideType type, String filename, String originalName) {
        var e = new CarouselSlideEntity();
        e.setType(type.name());
        e.setFilename(filename);
        e.setOriginalName(originalName);
        e.setSortOrder(slideRepo.findMaxSortOrder() + 1);
        return CarouselJpaMapper.toDomain(slideRepo.save(e));
    }

    @Override
    public void removeSlide(Long id) {
        if (!slideRepo.existsById(id)) {
            throw new SlideNotFoundException(id);
        }
        slideRepo.deleteById(id);
    }

    @Override
    public void reorderSlides(List<Long> orderedIds) {
        for (int i = 0; i < orderedIds.size(); i++) {
            var entity = slideRepo.findById(orderedIds.get(i))
                .orElseThrow(() -> new SlideNotFoundException(0L));
            entity.setSortOrder(i);
            slideRepo.save(entity);
        }
    }

    @Override
    public void updateInterval(int intervalMs) {
        var cfg = getOrCreateConfig();
        cfg.setIntervalMs(intervalMs);
        configRepo.save(cfg);
    }

    @Override
    public void updateOverlay(String filename) {
        var cfg = getOrCreateConfig();
        cfg.setOverlayFilename(filename);
        configRepo.save(cfg);
    }

    @Override
    public void removeOverlay() {
        var cfg = getOrCreateConfig();
        cfg.setOverlayFilename(null);
        configRepo.save(cfg);
    }

    private CarouselConfigEntity getOrCreateConfig() {
        return configRepo.findFirstByOrderByIdAsc()
            .orElseGet(() -> {
                var e = new CarouselConfigEntity();
                return configRepo.save(e);
            });
    }
}
