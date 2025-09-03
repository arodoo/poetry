/*
 * File: I18nJpaAdapterIT.java
 * Purpose: Integration test validating persistence-backed i18n adapter.
 * Tests ensure singleton entity creation, replacement, updates, and deletion.
 * Validates that the JPA adapter maintains exactly one i18n configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.i18n;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class I18nJpaAdapterIT {
  @Autowired I18nQueryPort query;
  @Autowired I18nCommandPort command;
  @Autowired I18nJpaRepository repo;

  @Test
  void ensuresSingletonLazyCreation() {
    repo.deleteAll();
    assertEquals(0, repo.count());
    String def = query.defaultLocale();
    assertEquals("en", def, "Default locale should initialize to 'en'");
    assertEquals(1, repo.count(), "Singleton row should exist after first access");
  }

  @Test
  void createReplacesExistingSingleton() {
    repo.deleteAll();
    var first = command.create(I18n.of("en", List.of("en")));
    assertEquals(1, repo.count());
    assertEquals("en", first.defaultLocale());
    command.create(I18n.of("fr", List.of("fr","en")));
    assertEquals(1, repo.count(), "Still a single row");
    assertEquals("fr", query.defaultLocale());
    assertTrue(query.supportedLocales().containsAll(List.of("fr","en")));
  }

  @Test
  void updateByIdChangesLocales() {
    repo.deleteAll();
    command.create(I18n.of("en", List.of("en")));
    Long id = repo.findAll().get(0).getId();
    I18n after = command.update(id, I18n.of("es", List.of("es","en")));
    assertEquals("es", after.defaultLocale());
    assertEquals(List.of("es","en"), after.supportedLocales());
  }

  @Test
  void deleteRemovesSingleton() {
    repo.deleteAll();
    command.create(I18n.of("en", List.of("en")));
    Long id = repo.findAll().get(0).getId();
    command.delete(id);
    assertEquals(0, repo.count());
  }
}
