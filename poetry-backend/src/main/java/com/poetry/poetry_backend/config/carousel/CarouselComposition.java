/*
 * File: CarouselComposition.java
 * Purpose: Wires all carousel use cases with their ports and adapters.
 * Follows the established composition-root pattern to keep use case
 * classes free of Spring annotations.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.carousel;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.carousel.port.CarouselCommandPort;
import com.poetry.poetry_backend.application.carousel.port.CarouselQueryPort;
import com.poetry.poetry_backend.application.carousel.port.FileStoragePort;
import com.poetry.poetry_backend.application.carousel.usecase.AddSlideUseCase;
import com.poetry.poetry_backend.application.carousel.usecase.GetCarouselConfigUseCase;
import com.poetry.poetry_backend.application.carousel.usecase.RemoveOverlayUseCase;
import com.poetry.poetry_backend.application.carousel.usecase.RemoveSlideUseCase;
import com.poetry.poetry_backend.application.carousel.usecase.ReorderSlidesUseCase;
import com.poetry.poetry_backend.application.carousel.usecase.UpdateIntervalUseCase;
import com.poetry.poetry_backend.application.carousel.usecase.UpdateOverlayUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.carousel.CarouselConfigJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.carousel.CarouselJpaCommandAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.carousel.CarouselJpaQueryAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.carousel.CarouselSlideJpaRepository;

@Configuration
public class CarouselComposition {

  @Bean
  CarouselJpaQueryAdapter carouselJpaQueryAdapter(
      CarouselSlideJpaRepository slideRepo,
      CarouselConfigJpaRepository configRepo) {
    return new CarouselJpaQueryAdapter(slideRepo, configRepo);
  }

  @Bean
  CarouselJpaCommandAdapter carouselJpaCommandAdapter(
      CarouselSlideJpaRepository slideRepo,
      CarouselConfigJpaRepository configRepo) {
    return new CarouselJpaCommandAdapter(slideRepo, configRepo);
  }

  @Bean
  GetCarouselConfigUseCase getCarouselConfigUseCase(
      CarouselQueryPort query) {
    return new GetCarouselConfigUseCase(query);
  }

  @Bean
  AddSlideUseCase addSlideUseCase(
      CarouselCommandPort command, FileStoragePort storage) {
    return new AddSlideUseCase(command, storage);
  }

  @Bean
  RemoveSlideUseCase removeSlideUseCase(
      CarouselCommandPort command,
      CarouselQueryPort query,
      FileStoragePort storage) {
    return new RemoveSlideUseCase(command, query, storage);
  }

  @Bean
  ReorderSlidesUseCase reorderSlidesUseCase(CarouselCommandPort command) {
    return new ReorderSlidesUseCase(command);
  }

  @Bean
  UpdateIntervalUseCase updateIntervalUseCase(
      CarouselCommandPort command) {
    return new UpdateIntervalUseCase(command);
  }

  @Bean
  UpdateOverlayUseCase updateOverlayUseCase(
      CarouselCommandPort command, FileStoragePort storage) {
    return new UpdateOverlayUseCase(command, storage);
  }

  @Bean
  RemoveOverlayUseCase removeOverlayUseCase(
      CarouselCommandPort command,
      CarouselQueryPort query,
      FileStoragePort storage) {
    return new RemoveOverlayUseCase(command, query, storage);
  }
}
