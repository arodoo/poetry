/*
 * File: GetEventByIdUseCase.java
 * Purpose: Use case for retrieving a single event by ID. Returns Optional
 * to handle not-found cases. Filters out soft-deleted events.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.usecase;

import java.util.Optional;

import com.poetry.poetry_backend.application.events.port.EventQueryPort;
import com.poetry.poetry_backend.domain.events.model.Event;

public class GetEventByIdUseCase {
  private final EventQueryPort queryPort;

  public GetEventByIdUseCase(EventQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public Optional<Event> execute(Long id) {
    return queryPort.findById(id).filter(event -> !event.isDeleted());
  }
}
