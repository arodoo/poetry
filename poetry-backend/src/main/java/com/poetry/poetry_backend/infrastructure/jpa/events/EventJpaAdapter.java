/*
 * File: EventJpaAdapter.java
 * Purpose: Infrastructure implementation of Events ports. Adapts JPA repo
 * to domain interfaces. Converts entities/domain via mapper. Filters deleted.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.events;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.events.port.EventsCommandPort;
import com.poetry.poetry_backend.application.events.port.EventsQueryPort;
import com.poetry.poetry_backend.domain.events.model.Event;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EventJpaAdapter implements EventsQueryPort, EventsCommandPort {
  private final EventJpaRepository repository;
  private final EventJpaMapper mapper;

  @Override
  public Optional<Event> findById(Long id) {
    return repository
        .findById(id)
        .filter(entity -> entity.getDeletedAt() == null)
        .map(mapper::toDomain);
  }

  @Override
  public List<Event> findAll() {
    return repository.findAllNotDeleted().stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public Page<Event> findAll(Pageable pageable) {
    return repository.findAllNotDeleted(pageable).map(mapper::toDomain);
  }

  @Override
  public List<Event> findNearby(Double latitude, Double longitude, Integer radiusMeters) {
    return repository.findNearby(latitude, longitude, radiusMeters).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public List<Event> findByUserId(Long userId) {
    return repository.findByUserId(userId).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public Event save(Event event) {
    EventEntity entity = mapper.toEntity(event);
    EventEntity saved = repository.save(entity);
    return mapper.toDomain(saved);
  }

  @Override
  public void delete(Long id) {
    repository.deleteById(id);
  }
}
