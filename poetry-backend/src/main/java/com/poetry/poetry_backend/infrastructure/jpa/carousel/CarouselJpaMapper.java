/*
 * File: CarouselJpaMapper.java
 * Purpose: Utility class for converting carousel JPA entities to domain
 * model records. Isolates mapping logic from adapter classes to keep
 * each file focused and under the line limit.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.carousel;

import com.poetry.poetry_backend.domain.carousel.model.CarouselSlide;
import com.poetry.poetry_backend.domain.carousel.model.SlideType;

public final class CarouselJpaMapper {
    private CarouselJpaMapper() { }

    public static CarouselSlide toDomain(CarouselSlideEntity e) {
        return new CarouselSlide(
            e.getId(),
            SlideType.valueOf(e.getType()),
            e.getFilename(),
            e.getOriginalName(),
            e.getSortOrder(),
            e.getCreatedAt());
    }
}
