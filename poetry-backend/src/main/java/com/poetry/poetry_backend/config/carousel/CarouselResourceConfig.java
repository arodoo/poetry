/*
 * File: CarouselResourceConfig.java
 * Purpose: Serves uploaded carousel media files (images and videos) as
 * static resources from the local filesystem. Maps the URL path
 * /api/v1/carousel/media/** to the configured upload directory.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.carousel;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CarouselResourceConfig implements WebMvcConfigurer {

  @Value("${carousel.upload-dir}")
  private String uploadDir;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    String location = "file:" + uploadDir + "/";
    registry
        .addResourceHandler("/api/v1/carousel/media/**")
        .addResourceLocations(location)
        .setCachePeriod(3600);
  }
}
