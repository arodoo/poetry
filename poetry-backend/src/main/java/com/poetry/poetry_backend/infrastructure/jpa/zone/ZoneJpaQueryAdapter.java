/*
 * File: ZoneJpaQueryAdapter.java
 * Purpose: Handles zone query operations mapping JPA entities to domain
 * models and throwing domain exceptions for missing records ensuring
 * clean separation between infrastructure and application concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.zone;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.poetry.poetry_backend.application.zone.port.ZoneQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.zone.exception.ZoneNotFoundException;
import com.poetry.poetry_backend.domain.zone.model.Zone;
import com.poetry.poetry_backend.infrastructure.jpa.common.SortParser;

public class ZoneJpaQueryAdapter implements ZoneQueryPort {
  private final ZoneJpaRepository repo;
  private static final Set<String> SORTABLE = Set.of(
      "name", "description", "status", "createdAt");

  public ZoneJpaQueryAdapter(ZoneJpaRepository repo) {
    this.repo = repo;
  }

  public List<Zone> findAll() {
    return repo.findAllActive().stream()
        .map(ZoneJpaMapper::toDomain).toList();
  }

  public PageResult<Zone> findAllPaged(
      int page, int size,
      String search, String sort) {
    Sort ordering = SortParser.parse(sort, SORTABLE);
    Pageable pageable = PageRequest.of(page, size, ordering);
    Page<ZoneEntity> entityPage = (search != null && !search.isBlank())
        ? repo.searchActive(search, pageable)
        : repo.findAllActive(pageable);
    List<Zone> content = entityPage.getContent()
        .stream().map(ZoneJpaMapper::toDomain).toList();
    return new PageResult<>(
        content,
        entityPage.getTotalElements(),
        entityPage.getTotalPages(),
        entityPage.getNumber(),
        entityPage.getSize());
  }

  public Zone findById(Long id) {
    return repo.findActiveById(id)
        .map(ZoneJpaMapper::toDomain)
        .orElseThrow(() -> new ZoneNotFoundException(id));
  }
}
