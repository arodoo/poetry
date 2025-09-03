/*
 * File: I18nEntity.java
 * Purpose: JPA entity backing the singleton i18n configuration (default + supported locales).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.i18n;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class I18nEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String defaultLocale;

  @ElementCollection(fetch = FetchType.EAGER)
  private List<String> supportedLocales;

  public Long getId() { return id; }

  public void setId(Long id) { this.id = id; }

  public String getDefaultLocale() { return defaultLocale; }

  public List<String> getSupportedLocales() { return supportedLocales; }

  public void setDefaultLocale(String defaultLocale) { this.defaultLocale = defaultLocale; }

  public void setSupportedLocales(List<String> supportedLocales) {
    this.supportedLocales = supportedLocales;
  }
}
