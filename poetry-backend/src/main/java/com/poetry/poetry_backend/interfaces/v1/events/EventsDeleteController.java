/*
 * File: EventsDeleteController.java
 * Purpose: Provide soft delete event endpoint with authentication. Only
 * event owner or admin can delete. Sets deletedAt timestamp.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.events.usecase.DeleteEventUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "events", description = "Event management")
@RestController
@RequestMapping("/api/v1/events")
public class EventsDeleteController {
  private final DeleteEventUseCase deleteEvent;

  public EventsDeleteController(DeleteEventUseCase deleteEvent) {
    this.deleteEvent = deleteEvent;
  }

  @Operation(
      operationId = "deleteEvent",
      summary = "Delete an event",
      description = "Soft delete event (sets deletedAt timestamp)")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "204", description = "Deleted"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "404", description = "Event not found")
      })
  @PreAuthorize("isAuthenticated()")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    deleteEvent.execute(id);
    return ResponseEntity.noContent().build();
  }
}
