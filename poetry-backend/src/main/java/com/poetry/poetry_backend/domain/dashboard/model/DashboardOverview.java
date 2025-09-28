/*
 * File: DashboardOverview.java
 * Purpose: Immutable aggregate capturing dashboard overview metrics with
 *          defensive validation for consistency guarantees.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.model;

public record DashboardOverview(
    int totalPoems,
    int publishedPoems,
    int draftPoems,
    int activeMembers,
    String highlightKey,
    String lastUpdatedLabel) {

  public DashboardOverview {
    if (totalPoems < 0) {
      throw new IllegalArgumentException("dashboard.totalPoems.negative");
    }
    if (publishedPoems < 0) {
      throw new IllegalArgumentException("dashboard.publishedPoems.negative");
    }
    if (draftPoems < 0) {
      throw new IllegalArgumentException("dashboard.draftPoems.negative");
    }
    if (activeMembers < 0) {
      throw new IllegalArgumentException("dashboard.activeMembers.negative");
    }
    if (publishedPoems + draftPoems > totalPoems) {
      throw new IllegalArgumentException("dashboard.metrics.inconsistent");
    }
    if (highlightKey == null || highlightKey.isBlank()) {
      throw new IllegalArgumentException("dashboard.highlightKey.blank");
    }
    if (lastUpdatedLabel == null || lastUpdatedLabel.isBlank()) {
      throw new IllegalArgumentException("dashboard.lastUpdated.blank");
    }
  }
}
