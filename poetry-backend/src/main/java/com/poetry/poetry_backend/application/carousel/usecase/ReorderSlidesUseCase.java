/*
 * File: ReorderSlidesUseCase.java
 * Purpose: Updates the display order of carousel slides based on an
 * ordered list of slide IDs provided by the admin. Delegates the
 * actual reordering to the command port for persistence.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;

public class ReorderSlidesUseCase {
    private final CarouselCommandPort command;

    public ReorderSlidesUseCase(CarouselCommandPort command) {
        this.command = command;
    }

    public void execute(List<Long> orderedIds) {
        command.reorderSlides(orderedIds);
    }
}
