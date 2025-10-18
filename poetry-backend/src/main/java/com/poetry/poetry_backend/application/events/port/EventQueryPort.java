/*
 * File: EventQueryPort.java
 * Purpose: Port defining query operations for events. Infrastructure
 * adapters implement this interface to provide data retrieval including
 * geospatial nearby search.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.port;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.poetry.poetry_backend.domain.events.model.Event;

public interface EventQueryPort {
  Optional<Event> findById(Long id);

  List<Event> findAll();

  Page<Event> findAll(Pageable pageable);

  List<Event> findNearby(Double latitude, Double longitude, Integer radiusMeters);

  List<Event> findByUserId(Long userId);
}
