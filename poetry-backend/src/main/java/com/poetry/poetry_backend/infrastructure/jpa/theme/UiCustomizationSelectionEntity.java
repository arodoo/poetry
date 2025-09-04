/*
 * File: UiCustomizationSelectionEntity.java
 * Purpose: JPA entity storing single system-wide UI customization selection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme;

import jakarta.persistence.*;

@Entity
@Table(name = "ui_customization_selection")
public class UiCustomizationSelectionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "theme_key", length = 50, nullable = false)
  private String themeKey;
  @Column(name = "font_key", length = 50, nullable = false)
  private String fontKey;
  @Column(name = "font_size_key", length = 50, nullable = false)
  private String fontSizeKey;
  @Column(name = "spacing_key", length = 50, nullable = false)
  private String spacingKey;
  @Column(name = "radius_key", length = 50, nullable = false)
  private String radiusKey;
  @Column(name = "shadow_key", length = 50, nullable = false)
  private String shadowKey;

  public Long getId() { return id; }
  public String getThemeKey() { return themeKey; }
  public String getFontKey() { return fontKey; }
  public String getFontSizeKey() { return fontSizeKey; }
  public String getSpacingKey() { return spacingKey; }
  public String getRadiusKey() { return radiusKey; }
  public String getShadowKey() { return shadowKey; }
  public void setId(Long id) { this.id = id; }
  public void setThemeKey(String v) { this.themeKey = v; }
  public void setFontKey(String v) { this.fontKey = v; }
  public void setFontSizeKey(String v) { this.fontSizeKey = v; }
  public void setSpacingKey(String v) { this.spacingKey = v; }
  public void setRadiusKey(String v) { this.radiusKey = v; }
  public void setShadowKey(String v) { this.shadowKey = v; }
}
