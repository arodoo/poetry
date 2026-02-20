/*
 * File: AddSlideUseCase.java
 * Purpose: Coordinates adding a new slide to the carousel by storing the
 * uploaded file via the file storage port and creating the slide record
 * via the command port. Returns the created slide domain object.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.usecase;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;
import com.poetry.poetry_backend.application.carousel.port.FileStoragePort;
import com.poetry.poetry_backend.domain.carousel.model.CarouselSlide;
import com.poetry.poetry_backend.domain.carousel.model.SlideType;

public class AddSlideUseCase {
    private final CarouselCommandPort command;
    private final FileStoragePort storage;

    public AddSlideUseCase(
        CarouselCommandPort command,
        FileStoragePort storage) {
        this.command = command;
        this.storage = storage;
    }

    public CarouselSlide execute(
        byte[] data, String originalName, SlideType type) {
        String filename = storage.store(data, originalName);
        return command.addSlide(type, filename, originalName);
    }
}
