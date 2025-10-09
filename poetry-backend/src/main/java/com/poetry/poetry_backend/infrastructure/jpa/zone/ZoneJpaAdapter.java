/*
 * File: ZoneJpaAdapter.java
 * Purpose: Main adapter delegating to query and command adapters
 * providing unified implementation of both query and command ports
 * for zones ensuring clean transaction boundaries and separation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.zone;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.zone.port.ZoneCommandPort;
import com.poetry.poetry_backend.application.zone.port.ZoneQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.zone.model.Zone;

@Transactional
public class ZoneJpaAdapter implements ZoneQueryPort, ZoneCommandPort {
  private final ZoneJpaQueryAdapter queryAdapter;
  private final ZoneJpaCommandAdapter commandAdapter;

  public ZoneJpaAdapter(ZoneJpaRepository repo) {
    this.queryAdapter = new ZoneJpaQueryAdapter(repo);
    this.commandAdapter = new ZoneJpaCommandAdapter(repo);
  }

  public List<Zone> findAll() {
    return queryAdapter.findAll();
  }

  public PageResult<Zone> findAllPaged(int page, int size, String search) {
    return queryAdapter.findAllPaged(page, size, search);
  }

  public Zone findById(Long id) {
    return queryAdapter.findById(id);
  }

  public Zone create(String name, String description, Long managerId) {
    return commandAdapter.create(name, description, managerId);
  }

  public Zone update(
      Long id,
      long version,
      String name,
      String description,
      Long managerId,
      String status) {
    return commandAdapter.update(id, version, name, description, managerId, status);
  }

  public void softDelete(Long id, long version) {
    commandAdapter.softDelete(id, version);
  }
}
