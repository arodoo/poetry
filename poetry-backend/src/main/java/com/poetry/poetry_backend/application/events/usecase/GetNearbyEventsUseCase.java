/*
 * File: GetNearbyEventsUseCase.java
 * Purpose: Use case for geospatial query to find events near coordinates.
 * Filters deleted and unpublished events. Critical for mobile app map
 * feature. Delegates distance calculation to infrastructure.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.events.port.EventQueryPort;
import com.poetry.poetry_backend.domain.events.model.Event;

public class GetNearbyEventsUseCase {
  private final EventQueryPort queryPort;

  public GetNearbyEventsUseCase(EventQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public List<Event> execute(Double latitude, Double longitude, Integer radiusMeters) {
    return queryPort.findNearby(latitude, longitude, radiusMeters).stream()
        .filter(Event::isPublished)
        .toList();
  }
}
