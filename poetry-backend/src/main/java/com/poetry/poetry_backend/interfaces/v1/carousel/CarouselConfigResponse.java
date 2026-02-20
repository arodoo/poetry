/*
 * File: CarouselConfigResponse.java
 * Purpose: REST DTO that flattens carousel configuration and slide list
 * into a serializable response. Keeps domain records off the wire.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import java.time.Instant;
import java.util.List;

import com.poetry.poetry_backend.domain.carousel.model.CarouselConfig;
import com.poetry.poetry_backend.domain.carousel.model.CarouselSlide;

public record CarouselConfigResponse(
    int intervalMs,
    String overlayFilename,
    List<SlideResponse> slides) {

  public record SlideResponse(
      Long id,
      String type,
      String filename,
      String originalName,
      int sortOrder,
      Instant createdAt) {

    public static SlideResponse from(CarouselSlide s) {
      return new SlideResponse(
          s.id(), s.type().name(), s.filename(),
          s.originalName(), s.sortOrder(), s.createdAt());
    }
  }

  public static CarouselConfigResponse from(CarouselConfig cfg) {
    List<SlideResponse> slides = cfg.slides().stream()
        .map(SlideResponse::from)
        .toList();
    return new CarouselConfigResponse(
        cfg.intervalMs(), cfg.overlayFilename(), slides);
  }
}
