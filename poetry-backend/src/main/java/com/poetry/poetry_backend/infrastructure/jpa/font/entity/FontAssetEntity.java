/*
 * File: FontAssetEntity.java
 * Purpose: Compact JPA entity for font asset metadata (<=80 lines, <=80 chars).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.font.entity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "font_assets")
public class FontAssetEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "font_key", nullable = false, length = 50, unique = true)
  private String key;

  @Column(nullable = false, length = 80)
  private String label;

  @Column(name = "woff2_url", nullable = false, length = 255)
  private String woff2Url;

  @ElementCollection
  @CollectionTable(name = "font_asset_weights", joinColumns = @JoinColumn(name = "font_asset_id"))
  @Column(name = "weight_value")
  private List<Integer> weights = new ArrayList<>();

  @Column(nullable = false, length = 120)
  private String hash;

  @Column(name = "preload_default")
  private boolean preloadDefault;

  @Column(name = "is_active")
  private boolean active;

  @Column(length = 160)
  private String integrity;

  private Instant deletedAt;
}
