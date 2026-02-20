/*
 * File: CarouselCommandPort.java
 * Purpose: Defines write operations for carousel slide and configuration
 * management. Covers adding, removing, reordering slides as well as
 * updating the display interval and overlay image filename.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.port;

import java.util.List;

import com.poetry.poetry_backend.domain.carousel.model.CarouselSlide;
import com.poetry.poetry_backend.domain.carousel.model.SlideType;

public interface CarouselCommandPort {
    CarouselSlide addSlide(
        SlideType type, String filename, String originalName);
    void removeSlide(Long id);
    void reorderSlides(List<Long> orderedIds);
    void updateInterval(int intervalMs);
    void updateOverlay(String filename);
    void removeOverlay();
}
