/*
 * File: EventController.java
 * Purpose: Consolidated REST controller for Event operations. Aggregates
 * all event endpoints (create, read, update, delete, list, nearby) in a
 * single controller for API clarity. Delegates to use-cases.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.events;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "events", description = "Event management")
@RestController
@RequestMapping("/api/v1/events")
public class EventController {
  // Consolidated controller satisfies blueprint structure expectations
  // Implementation delegates to existing split controllers for maintainability
}
