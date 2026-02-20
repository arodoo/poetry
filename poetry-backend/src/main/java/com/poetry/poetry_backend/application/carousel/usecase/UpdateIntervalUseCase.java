/*
 * File: UpdateIntervalUseCase.java
 * Purpose: Updates the auto-advance interval for the carousel display.
 * Accepts the new interval in milliseconds and delegates persistence
 * to the command port. Keeps controller logic minimal.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.carousel.usecase;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;

public class UpdateIntervalUseCase {
    private final CarouselCommandPort command;

    public UpdateIntervalUseCase(CarouselCommandPort command) {
        this.command = command;
    }

    public void execute(int intervalMs) {
        command.updateInterval(intervalMs);
    }
}
