/*
 * File: CarouselStorageConfig.java
 * Purpose: Declares the LocalFileStorageAdapter bean using the configured
 * carousel upload directory. The upload path is injected from properties
 * so it can differ across environments without code changes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.carousel;

import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.infrastructure.storage.LocalFileStorageAdapter;
import com.poetry.poetry_backend.infrastructure.storage.UploadDirResolver;

@Configuration
public class CarouselStorageConfig {

  @Bean
  LocalFileStorageAdapter localFileStorageAdapter(
      @Value("${carousel.upload-dir}") String uploadDir) {
    Path resolved = UploadDirResolver.resolve(uploadDir);
    return new LocalFileStorageAdapter(resolved);
  }
}
