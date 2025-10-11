/*
 * File: EventValidator.java
 * Purpose: Domain validation rules for Event aggregate. Validates title,
 * description length, coordinates range, and required fields.
 * Throws IllegalArgumentException on invalid data.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.events.model;

public final class EventValidator {
  private EventValidator() {}

  public static void validate(Event event) {
    if (event.title() == null || event.title().isBlank()) {
      throw new IllegalArgumentException("Title required");
    }
    if (event.title().length() > 200) {
      throw new IllegalArgumentException("Title max 200 chars");
    }
    if (event.description() != null && event.description().length() > 2000) {
      throw new IllegalArgumentException("Description max 2000 chars");
    }
    if (event.latitude() == null || event.longitude() == null) {
      throw new IllegalArgumentException("Coordinates required");
    }
    if (event.latitude() < -90 || event.latitude() > 90) {
      throw new IllegalArgumentException("Invalid latitude");
    }
    if (event.longitude() < -180 || event.longitude() > 180) {
      throw new IllegalArgumentException("Invalid longitude");
    }
    if (event.eventDate() == null) {
      throw new IllegalArgumentException("Event date required");
    }
    if (event.userId() == null) {
      throw new IllegalArgumentException("User ID required");
    }
  }
}
