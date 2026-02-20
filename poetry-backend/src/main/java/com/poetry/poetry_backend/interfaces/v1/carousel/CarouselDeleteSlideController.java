/*
 * File: CarouselDeleteSlideController.java
 * Purpose: Removes a carousel slide by ID and deletes its associated file
 * from local storage. Restricted to ADMIN role.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.carousel.usecase.RemoveSlideUseCase;

@RestController
@RequestMapping("/api/v1/carousel")
public class CarouselDeleteSlideController {
  private final RemoveSlideUseCase removeSlide;

  public CarouselDeleteSlideController(RemoveSlideUseCase removeSlide) {
    this.removeSlide = removeSlide;
  }

  @DeleteMapping("/slides/{id}")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    removeSlide.execute(id);
    return ResponseEntity.noContent().build();
  }
}
