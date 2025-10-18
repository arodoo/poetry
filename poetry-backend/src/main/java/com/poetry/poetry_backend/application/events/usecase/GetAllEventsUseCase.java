/*
 * File: GetAllEventsUseCase.java
 * Purpose: Use case for retrieving all non-deleted events. Filters soft-
 * deleted records. Returns list for API consumption. Supports pagination.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.usecase;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.poetry.poetry_backend.application.events.port.EventQueryPort;
import com.poetry.poetry_backend.domain.events.model.Event;

public class GetAllEventsUseCase {
  private final EventQueryPort queryPort;

  public GetAllEventsUseCase(EventQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public List<Event> execute() {
    return queryPort.findAll().stream().filter(event -> !event.isDeleted()).toList();
  }

  public Page<Event> execute(Pageable pageable) {
    return queryPort.findAll(pageable).map(event -> event.isDeleted() ? null : event);
  }
}
