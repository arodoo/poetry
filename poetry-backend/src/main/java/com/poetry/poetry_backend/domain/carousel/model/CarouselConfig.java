/*
 * File: CarouselConfig.java
 * Purpose: Immutable record representing the carousel display configuration.
 * Contains the auto-advance interval, optional overlay image filename, and
 * the ordered list of slides. Serves as the aggregate root for carousel
 * state retrieval across all architectural layers.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.carousel.model;

import java.util.List;

public record CarouselConfig(
    int intervalMs,
    String overlayFilename,
    List<CarouselSlide> slides) {
}
