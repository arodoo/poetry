/*
 * File: UserFingerprintJpaAdapter.java
 * Purpose: JPA adapter for user-fingerprint associations.
 * Implements both command and query ports using JPA repository.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.user;

import java.util.List;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.UserFingerprint;

@Component
public class UserFingerprintJpaAdapter
    implements
      UserFingerprintCommandPort,
      UserFingerprintQueryPort {
  private final UserFingerprintJpaRepository repository;

  public UserFingerprintJpaAdapter(UserFingerprintJpaRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserFingerprint save(UserFingerprint userFingerprint) {
    UserFingerprintEntity entity =
        UserFingerprintJpaMapper.toEntity(userFingerprint);
    UserFingerprintEntity saved = repository.save(entity);
    return UserFingerprintJpaMapper.toDomain(saved);
  }

  @Override
  public void delete(Long id) {
    repository.deleteById(id);
  }

  @Override
  public List<UserFingerprint> findByUserId(Long userId) {
    return repository.findByUserId(userId).stream()
        .map(UserFingerprintJpaMapper::toDomain)
        .toList();
  }

  @Override
  public List<UserFingerprint> findActiveByUserId(Long userId) {
    return repository.findActiveByUserId(userId).stream()
        .map(UserFingerprintJpaMapper::toDomain)
        .toList();
  }

  @Override
  public List<UserFingerprint> findByFingerprintId(Long fingerprintId) {
    return repository.findByFingerprintId(fingerprintId).stream()
        .map(UserFingerprintJpaMapper::toDomain)
        .toList();
  }
}
