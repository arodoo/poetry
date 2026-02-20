/*
 * File: CarouselUploadSlideController.java
 * Purpose: Accepts a multipart file upload and adds it as a new carousel
 * slide. Restricted to ADMIN role. Determines slide type from MIME type.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.carousel;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.poetry.poetry_backend.application.carousel.usecase.AddSlideUseCase;
import com.poetry.poetry_backend.domain.carousel.model.SlideType;
import com.poetry.poetry_backend.interfaces.v1.carousel.CarouselConfigResponse.SlideResponse;

@RestController
@RequestMapping("/api/v1/carousel")
public class CarouselUploadSlideController {
  private final AddSlideUseCase addSlide;

  public CarouselUploadSlideController(AddSlideUseCase addSlide) {
    this.addSlide = addSlide;
  }

  @PostMapping("/slides")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<SlideResponse> upload(
      @RequestParam("file") MultipartFile file) throws IOException {
    SlideType type = resolveType(file.getContentType());
    var slide = addSlide.execute(
        file.getBytes(), file.getOriginalFilename(), type);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(SlideResponse.from(slide));
  }

  private SlideType resolveType(String contentType) {
    if (contentType != null && contentType.startsWith("video/")) {
      return SlideType.VIDEO;
    }
    return SlideType.IMAGE;
  }
}
