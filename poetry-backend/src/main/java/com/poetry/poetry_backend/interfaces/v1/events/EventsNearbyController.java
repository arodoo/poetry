/*
 * File: EventsNearbyController.java
 * Purpose: Provide geospatial nearby events endpoint for mobile map feature.
 * Uses lat/lon/radius params. Returns published events only. Public access.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.events.usecase.GetNearbyEventsUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "events", description = "Event management")
@RestController
@RequestMapping("/api/v1/events")
public class EventsNearbyController {
  private final GetNearbyEventsUseCase getNearbyEvents;

  public EventsNearbyController(GetNearbyEventsUseCase getNearbyEvents) {
    this.getNearbyEvents = getNearbyEvents;
  }

  @Operation(
      operationId = "getNearbyEvents",
      summary = "Get nearby events",
      description = "Find events within radius using geospatial query")
  @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success")})
  @GetMapping("/nearby")
  public ResponseEntity<List<EventDtos.EventResponse>> nearby(
      @RequestParam Double latitude,
      @RequestParam Double longitude,
      @RequestParam(defaultValue = "5000") Integer radiusMeters) {
    var events = getNearbyEvents.execute(latitude, longitude, radiusMeters);
    var responses = events.stream().map(EventDtos::toResponse).toList();
    return ResponseEntity.ok(responses);
  }
}
