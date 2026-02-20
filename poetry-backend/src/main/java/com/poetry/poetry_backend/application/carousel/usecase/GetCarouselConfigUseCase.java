/*
 * File: GetCarouselConfigUseCase.java
 * Purpose: Retrieves the full carousel configuration including all slides
 * and display settings. Delegates to the query port to keep business
 * logic decoupled from persistence infrastructure.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.usecase;

import com.poetry.poetry_backend.application.carousel.port.CarouselQueryPort;
import com.poetry.poetry_backend.domain.carousel.model.CarouselConfig;

public class GetCarouselConfigUseCase {
    private final CarouselQueryPort query;

    public GetCarouselConfigUseCase(CarouselQueryPort query) {
        this.query = query;
    }

    public CarouselConfig execute() {
        return query.findConfig();
    }
}
