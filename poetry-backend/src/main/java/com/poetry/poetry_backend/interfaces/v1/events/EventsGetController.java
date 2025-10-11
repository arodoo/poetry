/*
 * File: EventsGetController.java
 * Purpose: Provide get event by ID endpoint. Public read access for event
 * discovery. Returns 404 if not found or soft-deleted.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.events.usecase.GetEventByIdUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "events", description = "Event management")
@RestController
@RequestMapping("/api/v1/events")
public class EventsGetController {
  private final GetEventByIdUseCase getEventById;

  public EventsGetController(GetEventByIdUseCase getEventById) {
    this.getEventById = getEventById;
  }

  @Operation(
      operationId = "getEvent",
      summary = "Get event by ID",
      description = "Retrieve single event details including location")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Success"),
        @ApiResponse(responseCode = "404", description = "Event not found")
      })
  @GetMapping("/{id}")
  public ResponseEntity<EventDtos.EventResponse> get(@PathVariable Long id) {
    return getEventById
        .execute(id)
        .map(EventDtos::toResponse)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }
}
