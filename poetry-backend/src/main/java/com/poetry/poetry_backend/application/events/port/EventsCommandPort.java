/*
 * File: EventsCommandPort.java
 * Purpose: Port defining command operations for events. Infrastructure
 * adapters implement persistence operations (save/delete). Follows CQRS
 * pattern separating commands from queries.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.port;

import com.poetry.poetry_backend.domain.events.model.Event;

public interface EventsCommandPort {
  Event save(Event event);

  void delete(Long id);
}
