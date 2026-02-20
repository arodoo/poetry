/*
 * File: RemoveSlideUseCase.java
 * Purpose: Coordinates removal of a carousel slide by deleting both the
 * persisted record and the associated file from storage. Ensures data
 * and file system consistency during slide deletion.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.usecase;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;
import com.poetry.poetry_backend.application.carousel.port.CarouselQueryPort;
import com.poetry.poetry_backend.application.carousel.port.FileStoragePort;

public class RemoveSlideUseCase {
    private final CarouselCommandPort command;
    private final CarouselQueryPort query;
    private final FileStoragePort storage;

    public RemoveSlideUseCase(
        CarouselCommandPort command,
        CarouselQueryPort query,
        FileStoragePort storage) {
        this.command = command;
        this.query = query;
        this.storage = storage;
    }

    public void execute(Long id) {
        var slide = query.findSlideById(id);
        storage.delete(slide.filename());
        command.removeSlide(id);
    }
}
