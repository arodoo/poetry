/*
 * File: EventEntity.java
 * Purpose: JPA entity for event persistence. Maps domain Event to database
 * table with geospatial columns. Hibernate manages schema via annotations.
 * Indexes on lat/lon for nearby queries, user_id for ownership filters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.events;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.poetry.poetry_backend.domain.events.model.EventStatus;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "events",
    indexes = {
      @Index(name = "idx_events_location", columnList = "latitude, longitude"),
      @Index(name = "idx_events_date", columnList = "event_date"),
      @Index(name = "idx_events_user", columnList = "user_id")
    })
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EventEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  @Column(nullable = false)
  private Long userId;

  @Column(nullable = false, length = 200)
  private String title;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(length = 255)
  private String locationName;

  @Column(nullable = false)
  private Double latitude;

  @Column(nullable = false)
  private Double longitude;

  @Column(nullable = false)
  private Instant eventDate;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private EventStatus status = EventStatus.DRAFT;

  @Column(length = 500)
  private String imageUrl;

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Instant updatedAt;

  private Instant deletedAt;

  @Version private Long version;
}
