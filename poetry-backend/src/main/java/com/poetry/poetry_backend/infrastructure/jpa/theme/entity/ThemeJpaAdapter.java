/*
 * File: ThemeJpaAdapter.java
 * Purpose: Adapter implementing theme ports with JPA repository.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.entity;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.exception.ThemeNotFoundException;
import com.poetry.poetry_backend.domain.theme.model.Theme;

@Transactional
public class ThemeJpaAdapter implements ThemeQueryPort, ThemeCommandPort {
  private final ThemeJpaRepository repo;

  public ThemeJpaAdapter(ThemeJpaRepository r) {
    this.repo = r;
  }

  public List<Theme> findAll() {
    return repo.findAllActive().stream().map(ThemeJpaMapper::toDomain).toList();
  }

  public Optional<Theme> findById(Long id) {
    return repo.findActiveById(id).map(ThemeJpaMapper::toDomain);
  }

  public Optional<Theme> findByKey(String key) {
    return repo.findActiveByKey(key).map(ThemeJpaMapper::toDomain);
  }

  public Optional<Theme> findActive() {
    return repo.findActive().map(ThemeJpaMapper::toDomain);
  }

  public Theme save(Theme t) {
    ThemeEntity e = ThemeJpaMapper.toEntity(t);
    if (t.isDeleted()) {
      e.setDeletedAt(Instant.now());
    } else {
      e.setDeletedAt(null);
    }
    return ThemeJpaMapper.toDomain(repo.save(e));
  }

  public void deleteSoft(Long id) {
    ThemeEntity e = repo.findById(id).orElseThrow(() -> new ThemeNotFoundException(id));
    e.setDeletedAt(Instant.now());
    repo.save(e);
  }

  public void restore(Long id) {
    ThemeEntity e = repo.findById(id).orElseThrow(() -> new ThemeNotFoundException(id));
    e.setDeletedAt(null);
    repo.save(e);
  }

  public void deactivateAll() {
    // Internal invariant enforcement: bulk deactivate prior to activating one
    repo.bulkDeactivateAllActive();
  }

  public long count() {
    return repo.count();
  }
}
