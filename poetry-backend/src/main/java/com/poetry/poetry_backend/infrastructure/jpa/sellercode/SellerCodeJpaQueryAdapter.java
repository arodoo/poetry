/*
 * File: SellerCodeJpaQueryAdapter.java
 * Purpose: Handles seller code query operations mapping JPA entities to domain
 * models and throwing domain exceptions for missing records ensuring clean
 * separation between infrastructure and application concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import java.util.List;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeQueryPort;
import com.poetry.poetry_backend.domain.sellercode.exception.SellerCodeNotFoundException;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

public class SellerCodeJpaQueryAdapter implements SellerCodeQueryPort {
  private final SellerCodeJpaRepository repo;

  public SellerCodeJpaQueryAdapter(SellerCodeJpaRepository repo) {
    this.repo = repo;
  }

  public List<SellerCode> findAll() {
    return repo.findAllActive().stream()
        .map(SellerCodeJpaMapper::toDomain)
        .toList();
  }

  public SellerCode findById(Long id) {
    return repo.findActiveById(id)
        .map(SellerCodeJpaMapper::toDomain)
        .orElseThrow(() -> new SellerCodeNotFoundException(id));
  }
}
