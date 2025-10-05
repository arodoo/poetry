/*
 * File: SellerCodeJpaQueryAdapter.java
 * Purpose: Handles seller code query operations mapping JPA entities to domain
 * models and throwing domain exceptions for missing records ensuring clean
 * separation between infrastructure and application concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeQueryPort;
import com.poetry.poetry_backend.domain.sellercode.exception.SellerCodeNotFoundException;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.domain.shared.model.PageResult;

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

  public PageResult<SellerCode> findAllPaged(int page, int size, String search) {
    Pageable pageable = PageRequest.of(page, size);
    Page<SellerCodeEntity> entityPage = (search == null || search.isEmpty())
        ? repo.findAllActive(pageable)
        : repo.searchActive(search, pageable);
    List<SellerCode> content = entityPage.getContent().stream()
        .map(SellerCodeJpaMapper::toDomain)
        .toList();
    return new PageResult<>(
        content,
        entityPage.getTotalElements(),
        entityPage.getTotalPages(),
        page,
        size);
  }

  public SellerCode findById(Long id) {
    return repo.findActiveById(id)
        .map(SellerCodeJpaMapper::toDomain)
        .orElseThrow(() -> new SellerCodeNotFoundException(id));
  }
}
