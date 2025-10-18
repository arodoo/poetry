/*
 * File: EventsListController.java
 * Purpose: Provide list all events endpoint. Public read access for event
 * browsing. Returns simple list without pagination.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.events.usecase.GetAllEventsUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "events", description = "Event management")
@RestController
@RequestMapping("/api/v1/events")
public class EventsListController {
  private final GetAllEventsUseCase getAllEvents;

  public EventsListController(GetAllEventsUseCase getAllEvents) {
    this.getAllEvents = getAllEvents;
  }

  @Operation(
      operationId = "listEvents",
      summary = "List all events",
      description = "Get all events without pagination")
  @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success")})
  @GetMapping("/list")
  public ResponseEntity<List<EventDto.EventResponse>> list() {
    var events = getAllEvents.execute();
  var responses = events.stream().map(EventDto::toResponse).toList();
    return ResponseEntity.ok(responses);
  }
}
