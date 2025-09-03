/*
 * File: ThemeEntity.java
 * Purpose: JPA entity mapping UI theme with soft delete and colors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.*;

@Entity
@Table(name = "themes")
public class ThemeEntity {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, length = 50)
  private String name;
  @Column(name = "is_active")
  private boolean active;
  @ElementCollection
  @CollectionTable(name = "theme_colors", joinColumns = @JoinColumn(name = "theme_id"))
  @MapKeyColumn(name = "color_key")
  @Column(name = "color_value")
  private Map<String, String> colors = new HashMap<>();
  private Instant deletedAt;

  public Long getId() { return id; }
  public String getName() { return name; }
  public boolean isActive() { return active; }
  public Map<String, String> getColors() { return colors; }
  public Instant getDeletedAt() { return deletedAt; }
  public void setId(Long id) { this.id = id; }
  public void setName(String n) { this.name = n; }
  public void setActive(boolean a) { this.active = a; }
  public void setColors(Map<String, String> c) { this.colors = c; }
  public void setDeletedAt(Instant d) { this.deletedAt = d; }
}
