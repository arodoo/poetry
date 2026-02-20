/*
 * File: CarouselOverlayDeleteController.java
 * Purpose: Clears the static overlay image from the carousel configuration.
 * Restricted to ADMIN role.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.carousel.usecase.RemoveOverlayUseCase;

@RestController
@RequestMapping("/api/v1/carousel")
public class CarouselOverlayDeleteController {
  private final RemoveOverlayUseCase removeOverlay;

  public CarouselOverlayDeleteController(
      RemoveOverlayUseCase removeOverlay) {
    this.removeOverlay = removeOverlay;
  }

  @DeleteMapping("/config/overlay")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Void> delete() {
    removeOverlay.execute();
    return ResponseEntity.noContent().build();
  }
}
