/*
 * File: DashboardJpaAdapter.java
 * Purpose: Bridge Dashboard ports with JPA persistence.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.dashboard;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.application.dashboard.port.DashboardCommandPort;
import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

public class DashboardJpaAdapter implements DashboardQueryPort, DashboardCommandPort {
  private final DashboardJpaRepository repository;

  public DashboardJpaAdapter(DashboardJpaRepository repository) {
    this.repository = repository;
  }

  @Override
  public List<Dashboard> findAll() {
    return repository.findAll().stream().map(DashboardJpaMapper::toDomain).toList();
  }

  @Override
  public Optional<Dashboard> findById(Long id) {
    return repository.findById(id).map(DashboardJpaMapper::toDomain);
  }

  @Override
  public Dashboard save(Dashboard dashboard) {
    DashboardEntity entity = DashboardJpaMapper.toEntity(dashboard);
    DashboardEntity persisted = repository.save(entity);
    return DashboardJpaMapper.toDomain(persisted);
  }

  @Override
  public void deleteById(Long id) {
    repository.deleteById(id);
  }

  @Override
  public boolean existsBySlug(String slug) {
    return repository.existsBySlug(slug);
  }
}
