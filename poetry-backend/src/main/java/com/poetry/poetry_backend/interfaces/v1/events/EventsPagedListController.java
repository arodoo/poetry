/*
 * File: EventsPagedListController.java
 * Purpose: Provide paginated events endpoint. Supports size/page params for
 * efficient large datasets. Public read access.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public class EventsPagedListController {
  private final GetAllEventsUseCase getAllEvents;

  public EventsPagedListController(GetAllEventsUseCase getAllEvents) {
    this.getAllEvents = getAllEvents;
  }

  @Operation(
      operationId = "listEventsPaged",
      summary = "List events with pagination",
      description = "Get events with page/size params")
  @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success")})
  @GetMapping
  public ResponseEntity<Page<EventDto.EventResponse>> listPaged(Pageable pageable) {
    var events = getAllEvents.execute(pageable);
  var responses = events.map(EventDto::toResponse);
    return ResponseEntity.ok(responses);
  }
}
