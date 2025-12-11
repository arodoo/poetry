/*
 * File: EventValidator.java
 * Purpose: Domain validation rules for Event aggregate. Validates title,
 * description length, coordinates range, and required fields.
 * Throws IllegalArgumentException on invalid data.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.events.model;

public final class EventValidator {
  private EventValidator() {
  }

  public static void validate(Event event) {
    if (event.title() == null || event.title().isBlank()) {
      throw new IllegalArgumentException("event.title.required");
    }
    if (event.title().length() > 200) {
      throw new IllegalArgumentException("event.title.length");
    }
    if (event.description() != null && event.description().length() > 2000) {
      throw new IllegalArgumentException("event.description.length");
    }
    if (event.latitude() == null || event.longitude() == null) {
      throw new IllegalArgumentException("event.coordinates.required");
    }
    if (event.latitude() < -90 || event.latitude() > 90) {
      throw new IllegalArgumentException("event.latitude.invalid");
    }
    if (event.longitude() < -180 || event.longitude() > 180) {
      throw new IllegalArgumentException("event.longitude.invalid");
    }
    if (event.eventDate() == null) {
      throw new IllegalArgumentException("event.date.required");
    }
    if (event.userId() == null) {
      throw new IllegalArgumentException("event.userId.required");
    }
  }
}
