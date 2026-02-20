/*
 * File: CarouselOverlayUploadController.java
 * Purpose: Accepts a multipart image upload and sets it as the static
 * overlay displayed in the bottom-right corner of the carousel.
 * Restricted to ADMIN role.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.poetry.poetry_backend.application.carousel.usecase.UpdateOverlayUseCase;

@RestController
@RequestMapping("/api/v1/carousel")
public class CarouselOverlayUploadController {
  private final UpdateOverlayUseCase updateOverlay;

  public CarouselOverlayUploadController(
      UpdateOverlayUseCase updateOverlay) {
    this.updateOverlay = updateOverlay;
  }

  @PostMapping("/config/overlay")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Void> upload(
      @RequestParam("file") MultipartFile file) throws IOException {
    updateOverlay.execute(file.getBytes(), file.getOriginalFilename());
    return ResponseEntity.noContent().build();
  }
}
