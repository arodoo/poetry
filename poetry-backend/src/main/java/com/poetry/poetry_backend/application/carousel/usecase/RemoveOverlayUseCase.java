/*
 * File: RemoveOverlayUseCase.java
 * Purpose: Removes the overlay image from the carousel configuration and
 * deletes the associated file from storage. Ensures both the config
 * record and filesystem stay consistent after overlay removal.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.usecase;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;
import com.poetry.poetry_backend.application.carousel.port.CarouselQueryPort;
import com.poetry.poetry_backend.application.carousel.port.FileStoragePort;

public class RemoveOverlayUseCase {
    private final CarouselCommandPort command;
    private final CarouselQueryPort query;
    private final FileStoragePort storage;

    public RemoveOverlayUseCase(
        CarouselCommandPort command,
        CarouselQueryPort query,
        FileStoragePort storage) {
        this.command = command;
        this.query = query;
        this.storage = storage;
    }

    public void execute() {
        var config = query.findConfig();
        if (config.overlayFilename() != null) {
            storage.delete(config.overlayFilename());
        }
        command.removeOverlay();
    }
}
