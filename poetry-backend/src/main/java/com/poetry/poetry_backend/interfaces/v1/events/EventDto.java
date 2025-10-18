/*
 * File: EventDto.java
 * Purpose: DTO classes for event endpoints representing request and response
 * payloads independently from domain model. Enables clear API contracts.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import java.time.Instant;

import com.poetry.poetry_backend.domain.events.model.Event;

import io.swagger.v3.oas.annotations.media.Schema;

public final class EventDto {
  @Schema(description = "Event response representation")
  public record EventResponse(
      @Schema(description = "Event ID", example = "1") Long id,
      @Schema(description = "User ID", example = "123") Long userId,
      @Schema(description = "Event title", example = "Park Meetup") String title,
      @Schema(description = "Event description", example = "Join us") String description,
      @Schema(description = "Location name", example = "Central Park") String locationName,
      @Schema(description = "Latitude", example = "40.785091") Double latitude,
      @Schema(description = "Longitude", example = "-73.968285") Double longitude,
      @Schema(description = "Event date") Instant eventDate,
      @Schema(description = "Status", example = "PUBLISHED") String status,
      @Schema(description = "Image URL", example = "https://cdn.example.com/img.jpg")
          String imageUrl,
      @Schema(description = "Version", example = "1") Long version) {}

  @Schema(description = "Event creation request")
  public record EventCreateRequest(
      @Schema(description = "Event title", requiredMode = Schema.RequiredMode.REQUIRED)
          String title,
      @Schema(description = "Event description") String description,
      @Schema(description = "Location name") String locationName,
      @Schema(description = "Latitude", requiredMode = Schema.RequiredMode.REQUIRED)
          Double latitude,
      @Schema(description = "Longitude", requiredMode = Schema.RequiredMode.REQUIRED)
          Double longitude,
      @Schema(description = "Event date", requiredMode = Schema.RequiredMode.REQUIRED)
          Instant eventDate,
      @Schema(description = "Image URL") String imageUrl) {}

  @Schema(description = "Event update request")
  public record EventUpdateRequest(
      @Schema(description = "Event title") String title,
      @Schema(description = "Event description") String description,
      @Schema(description = "Location name") String locationName,
      @Schema(description = "Latitude") Double latitude,
      @Schema(description = "Longitude") Double longitude,
      @Schema(description = "Event date") Instant eventDate,
      @Schema(description = "Status", example = "PUBLISHED") String status,
      @Schema(description = "Image URL") String imageUrl) {}

  public static EventResponse toResponse(Event e) {
    return new EventResponse(
        e.id(),
        e.userId(),
        e.title(),
        e.description(),
        e.locationName(),
        e.latitude(),
        e.longitude(),
        e.eventDate(),
        e.status().name(),
        e.imageUrl(),
        e.version());
  }
}
