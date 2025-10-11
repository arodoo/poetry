/*
 * File: EventStatus.java
 * Purpose: Enum representing the lifecycle status of an event.
 * Values: DRAFT (not yet published), PUBLISHED (visible to users),
 * CANCELLED (event cancelled but not deleted).
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.events.model;

public enum EventStatus {
  DRAFT,
  PUBLISHED,
  CANCELLED
}
