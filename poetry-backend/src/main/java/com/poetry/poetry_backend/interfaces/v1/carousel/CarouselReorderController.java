/*
 * File: CarouselReorderController.java
 * Purpose: Accepts an ordered list of slide IDs from the admin and updates
 * their display order. Restricted to ADMIN role.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.carousel.usecase.ReorderSlidesUseCase;

@RestController
@RequestMapping("/api/v1/carousel")
public class CarouselReorderController {
  private final ReorderSlidesUseCase reorderSlides;

  public CarouselReorderController(ReorderSlidesUseCase reorderSlides) {
    this.reorderSlides = reorderSlides;
  }

  @PutMapping("/slides/order")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Void> reorder(@RequestBody List<Long> orderedIds) {
    reorderSlides.execute(orderedIds);
    return ResponseEntity.noContent().build();
  }
}
