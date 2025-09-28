/*
 * File: DashboardEntity.java
 * Purpose: JPA entity backing the dashboard aggregate.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.dashboard;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dashboards")
public class DashboardEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 80)
  private String name;

  @Column(nullable = false, unique = true, length = 80)
  private String slug;

  @Column(length = 160)
  private String description;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  protected DashboardEntity() {}

  public DashboardEntity(
      Long id, String name, String slug, String description, Instant createdAt) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.createdAt = createdAt;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getSlug() {
    return slug;
  }

  public String getDescription() {
    return description;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}
