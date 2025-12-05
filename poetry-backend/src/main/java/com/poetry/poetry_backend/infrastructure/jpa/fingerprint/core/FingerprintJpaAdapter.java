/*
 * File: FingerprintJpaAdapter.java
 * Purpose: Infrastructure implementation of Fingerprint ports adapting JPA
 * repository to domain interfaces. Converts between entities and domain
 * objects via mapper with soft-delete filtering.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FingerprintJpaAdapter
    implements FingerprintQueryPort, FingerprintCommandPort {

  private final FingerprintJpaRepository repository;
  private final FingerprintJpaMapper mapper;

  @Override
  public Optional<Fingerprint> findById(Long id) {
    return filterNotDeleted(repository.findById(id));
  }

  @Override
  public List<Fingerprint> findAll() {
    return mapEntitiesToDomain(repository.findAllNotDeleted());
  }

  @Override
  public List<Fingerprint> findByUserId(Long userId) {
    return mapEntitiesToDomain(repository.findByUserId(userId));
  }

  @Override
  public List<Fingerprint> findActiveByUserId(Long userId) {
    return mapEntitiesToDomain(
        repository.findByUserIdAndStatus(userId, FingerprintStatus.ACTIVE));
  }

  @Override
  public Optional<Fingerprint> findByR503SlotId(Integer r503SlotId) {
    return filterNotDeleted(repository.findByR503SlotId(r503SlotId));
  }

  @Override
  public Fingerprint save(Fingerprint fingerprint) {
    FingerprintEntity entity = mapper.toEntity(fingerprint);
    return mapper.toDomain(repository.save(entity));
  }

  @Override
  public void deleteById(Long id) {
    repository.findById(id).ifPresent(this::softDelete);
  }

  @Override
  public boolean existsByUserId(Long userId) {
    return repository.existsByUserId(userId);
  }

  private List<Fingerprint> mapEntitiesToDomain(
      List<FingerprintEntity> entities) {
    return entities.stream().map(mapper::toDomain).collect(Collectors.toList());
  }

  private Optional<Fingerprint> filterNotDeleted(
      Optional<FingerprintEntity> entity) {
    return entity
        .filter(e -> e.getDeletedAt() == null)
        .map(mapper::toDomain);
  }

  private void softDelete(FingerprintEntity entity) {
    entity.setDeletedAt(Instant.now());
    repository.save(entity);
  }
}
