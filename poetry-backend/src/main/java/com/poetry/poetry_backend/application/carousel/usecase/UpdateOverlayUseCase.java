/*
 * File: UpdateOverlayUseCase.java
 * Purpose: Stores a new overlay image file and updates the carousel
 * configuration with its filename. Replaces any previously set overlay
 * by delegating to file storage and command ports.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.usecase;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;
import com.poetry.poetry_backend.application.carousel.port.FileStoragePort;

public class UpdateOverlayUseCase {
    private final CarouselCommandPort command;
    private final FileStoragePort storage;

    public UpdateOverlayUseCase(
        CarouselCommandPort command,
        FileStoragePort storage) {
        this.command = command;
        this.storage = storage;
    }

    public void execute(byte[] data, String originalName) {
        String filename = storage.store(data, originalName);
        command.updateOverlay(filename);
    }
}
