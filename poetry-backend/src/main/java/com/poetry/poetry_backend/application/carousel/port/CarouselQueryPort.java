/*
 * File: CarouselQueryPort.java
 * Purpose: Defines read-only operations for retrieving carousel configuration
 * and slide data. Abstracts persistence access so use cases remain decoupled
 * from JPA or any specific storage implementation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.port;

import java.util.List;

import com.poetry.poetry_backend.domain.carousel.model.CarouselConfig;
import com.poetry.poetry_backend.domain.carousel.model.CarouselSlide;

public interface CarouselQueryPort {
    CarouselConfig findConfig();
    List<CarouselSlide> findAllSlides();
    CarouselSlide findSlideById(Long id);
}
