/*
 * File: CarouselGetConfigController.java
 * Purpose: Returns the full carousel configuration including slides and
 * display settings. Public endpoint so the TV display page can load
 * without authentication.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.carousel.usecase.GetCarouselConfigUseCase;

@RestController
@RequestMapping("/api/v1/carousel")
public class CarouselGetConfigController {
  private final GetCarouselConfigUseCase getConfig;

  public CarouselGetConfigController(GetCarouselConfigUseCase getConfig) {
    this.getConfig = getConfig;
  }

  @GetMapping("/config")
  public ResponseEntity<CarouselConfigResponse> getConfig() {
    return ResponseEntity.ok(
        CarouselConfigResponse.from(getConfig.execute()));
  }
}
