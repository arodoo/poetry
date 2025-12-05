/*
 * File: EventsCreateController.java
 * Purpose: Provide create event endpoint with authentication. Delegates to
 * use case and maps request/response DTOs. Auto-assigns current user ID.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.events.usecase.CreateEventUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "events", description = "Event management")
@RestController
@RequestMapping("/api/v1/events")
public class EventsCreateController {
  private final CreateEventUseCase createEvent;

  public EventsCreateController(CreateEventUseCase createEvent) {
    this.createEvent = createEvent;
  }

  @Operation(
      operationId = "createEvent",
      summary = "Create a new event",
      description = "Create event with location data for map display")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "201", description = "Created"),
        @ApiResponse(responseCode = "400", description = "Invalid request"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
      })
  @PreAuthorize("isAuthenticated()")
  @PostMapping
  public ResponseEntity<EventDto.EventResponse> create(
      @RequestBody EventDto.EventCreateRequest r, Authentication auth) {
    Long userId = Long.parseLong(auth.getName());
    var event =
        createEvent.execute(
            userId,
            r.title(),
            r.description(),
            r.locationName(),
            r.latitude(),
            r.longitude(),
            r.eventDate(),
            r.imageUrl());
    return ResponseEntity.status(201).body(EventDto.toResponse(event));
  }
}
