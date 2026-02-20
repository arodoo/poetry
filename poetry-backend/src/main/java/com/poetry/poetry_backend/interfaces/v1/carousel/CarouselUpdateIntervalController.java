/*
 * File: CarouselUpdateIntervalController.java
 * Purpose: Updates the auto-advance interval for the carousel in ms.
 * Accepts a plain integer body. Restricted to ADMIN role.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.carousel.usecase.UpdateIntervalUseCase;

@RestController
@RequestMapping("/api/v1/carousel")
public class CarouselUpdateIntervalController {
  private final UpdateIntervalUseCase updateInterval;

  public CarouselUpdateIntervalController(
      UpdateIntervalUseCase updateInterval) {
    this.updateInterval = updateInterval;
  }

  @PutMapping("/config/interval")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Void> update(@RequestBody int intervalMs) {
    updateInterval.execute(intervalMs);
    return ResponseEntity.noContent().build();
  }
}
