/*
 * File: SellerCodeJpaCommandAdapter.java
 * Purpose: Handles seller code command operations including create update and
 * soft delete delegating to support helpers for guard and persist logic to
 * maintain clean separation and testable command semantics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import static com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaCommandSupport.*;

import java.time.Instant;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.domain.sellercode.exception.InvalidUserException;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

public class SellerCodeJpaCommandAdapter implements SellerCodeCommandPort {
  private final SellerCodeJpaRepository repository;
  private final UserJpaRepository userRepository;

  public SellerCodeJpaCommandAdapter(
      SellerCodeJpaRepository repository, UserJpaRepository userRepository) {
    this.repository = repository;
    this.userRepository = userRepository;
  }

  @Override
  public SellerCode create(
      String code, String organizationId, Long userId, String status) {
    if (!userRepository.existsById(userId)) {
      throw InvalidUserException.userNotFound(userId);
    }
    SellerCodeEntity entity = new SellerCodeEntity();
    entity.setCode(code);
    entity.setOrganizationId(organizationId);
    entity.setUserId(userId);
    entity.setStatus(status);
    return persist(repository, entity);
  }

  @Override
  public SellerCode update(
      Long id,
      long version,
      String code,
      String organizationId,
      Long userId,
      String status) {
    if (!userRepository.existsById(userId)) {
      throw InvalidUserException.userNotFound(userId);
    }
    SellerCodeEntity entity = guard(repository, id, version);
    entity.setCode(code);
    entity.setOrganizationId(organizationId);
    entity.setUserId(userId);
    entity.setStatus(status);
    return persist(repository, entity);
  }

  @Override
  public void softDelete(Long id, long version) {
    SellerCodeEntity entity = guard(repository, id, version);
    entity.setDeletedAt(Instant.now());
    repository.save(entity);
  }
}
