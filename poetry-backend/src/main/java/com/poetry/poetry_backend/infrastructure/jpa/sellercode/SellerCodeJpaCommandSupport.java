/*
 * File: SellerCodeJpaCommandSupport.java
 * Purpose: Shared helpers for seller code command adapter logic extracting
 * common guard and persist patterns to reduce duplication across command
 * operations while maintaining clean separation of concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import com.poetry.poetry_backend.domain.sellercode.exception.SellerCodeNotFoundException;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

final class SellerCodeJpaCommandSupport {
  private SellerCodeJpaCommandSupport() {}

  static SellerCodeEntity guard(
      SellerCodeJpaRepository repository, Long id, long version) {
    SellerCodeEntity entity =
        repository
            .findById(id)
            .orElseThrow(() -> new SellerCodeNotFoundException(id));
    Long currentVersion = entity.getVersion();
    if (currentVersion != null && !currentVersion.equals(version)) {
      throw new RuntimeException("Version mismatch for seller code " + id);
    }
    return entity;
  }

  static SellerCode persist(
      SellerCodeJpaRepository repository, SellerCodeEntity entity) {
    return SellerCodeJpaMapper.toDomain(repository.save(entity));
  }
}
