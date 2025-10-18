/*
 * File: EventsUpdateController.java
 * Purpose: Provide update event endpoint with authentication. Only event
 * owner can update. Uses optimistic locking via version field.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.events.usecase.UpdateEventUseCase;
import com.poetry.poetry_backend.domain.events.model.EventStatus;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "events", description = "Event management")
@RestController
@RequestMapping("/api/v1/events")
public class EventsUpdateController {
  private final UpdateEventUseCase updateEvent;

  public EventsUpdateController(UpdateEventUseCase updateEvent) {
    this.updateEvent = updateEvent;
  }

  @Operation(
      operationId = "updateEvent",
      summary = "Update an event",
      description = "Update event details with optimistic locking")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Updated"),
        @ApiResponse(responseCode = "400", description = "Invalid request"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "404", description = "Event not found"),
        @ApiResponse(responseCode = "409", description = "Conflict/version mismatch")
      })
  @PreAuthorize("isAuthenticated()")
  @PutMapping("/{id}")
  public ResponseEntity<EventDto.EventResponse> update(
      @PathVariable Long id, @RequestBody EventDto.EventUpdateRequest r) {
    var status = r.status() != null ? EventStatus.valueOf(r.status()) : null;
    var event =
        updateEvent.execute(
            id,
            r.title(),
            r.description(),
            r.locationName(),
            r.latitude(),
            r.longitude(),
            r.eventDate(),
            status,
            r.imageUrl());
    return ResponseEntity.ok(EventDto.toResponse(event));
  }
}
