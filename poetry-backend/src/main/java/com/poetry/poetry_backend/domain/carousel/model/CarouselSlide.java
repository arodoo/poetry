/*
 * File: CarouselSlide.java
 * Purpose: Immutable record representing a single slide in the carousel.
 * Holds metadata about the uploaded media file including its type,
 * generated filename, original name and display order. Used as the
 * core value object for carousel slide management across all layers.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.carousel.model;

import java.time.Instant;

public record CarouselSlide(
    Long id,
    SlideType type,
    String filename,
    String originalName,
    int sortOrder,
    Instant createdAt) {
}
