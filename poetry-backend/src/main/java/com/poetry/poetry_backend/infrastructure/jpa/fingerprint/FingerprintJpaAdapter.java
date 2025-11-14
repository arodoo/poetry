/*
 * File: FingerprintJpaAdapter.java
 * Purpose: Infrastructure implementation of Fingerprint ports adapting JPA
 * repository to domain interfaces. Converts between entities and domain
 * objects via mapper with soft-delete filtering.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintStatus;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FingerprintJpaAdapter
    implements FingerprintQueryPort, FingerprintCommandPort {

  private final FingerprintJpaRepository repository;
  private final FingerprintJpaMapper mapper;

  @Override
  public Optional<Fingerprint> findById(Long id) {
    return repository
        .findById(id)
        .filter(entity -> entity.getDeletedAt() == null)
        .map(mapper::toDomain);
  }

  @Override
  public List<Fingerprint> findAll() {
    return repository.findAllNotDeleted().stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public List<Fingerprint> findByUserId(Long userId) {
    return repository.findByUserId(userId).stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public List<Fingerprint> findActiveByUserId(Long userId) {
    return repository
        .findByUserIdAndStatus(userId, FingerprintStatus.ACTIVE)
        .stream()
        .map(mapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public Fingerprint save(Fingerprint fingerprint) {
    FingerprintEntity entity = mapper.toEntity(fingerprint);
    FingerprintEntity saved = repository.save(entity);
    return mapper.toDomain(saved);
  }

  @Override
  public void deleteById(Long id) {
    repository.findById(id).ifPresent(entity -> {
      entity.setDeletedAt(Instant.now());
      repository.save(entity);
    });
  }

  @Override
  public boolean existsByUserId(Long userId) {
    return repository.existsByUserId(userId);
  }
}
