/*
 * File: EventJpaMapper.java
 * Purpose: Converts between EventEntity (JPA) and Event (domain). Uses
 * EventRehydrator for domain reconstruction. Preserves all timestamps.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.events;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.domain.events.model.Event;
import com.poetry.poetry_backend.domain.events.model.EventRehydrator;

@Component
public class EventJpaMapper {
  public EventEntity toEntity(Event event) {
    EventEntity entity = new EventEntity();
    entity.setId(event.id());
    entity.setUserId(event.userId());
    entity.setTitle(event.title());
    entity.setDescription(event.description());
    entity.setLocationName(event.locationName());
    entity.setLatitude(event.latitude());
    entity.setLongitude(event.longitude());
    entity.setEventDate(event.eventDate());
    entity.setStatus(event.status());
    entity.setImageUrl(event.imageUrl());
    entity.setCreatedAt(event.createdAt());
    entity.setUpdatedAt(event.updatedAt());
    entity.setDeletedAt(event.deletedAt());
    entity.setVersion(event.version());
    return entity;
  }

  public Event toDomain(EventEntity entity) {
    return EventRehydrator.rehydrate(
        entity.getId(),
        entity.getUserId(),
        entity.getTitle(),
        entity.getDescription(),
        entity.getLocationName(),
        entity.getLatitude(),
        entity.getLongitude(),
        entity.getEventDate(),
        entity.getStatus(),
        entity.getImageUrl(),
        entity.getCreatedAt(),
        entity.getUpdatedAt(),
        entity.getDeletedAt(),
        entity.getVersion());
  }
}
