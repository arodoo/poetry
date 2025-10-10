/*
 * File: MembershipJpaQueryAdapter.java
 * Purpose: Handles membership query operations with pagination support.
 * Maps JPA entities to domain models and enforces not-found semantics
 * ensuring clean separation between infrastructure and application.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.poetry.poetry_backend.application.membership.port.MembershipQueryPort;
import com.poetry.poetry_backend.domain.membership.exception.MembershipNotFoundException;
import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.domain.shared.model.PageResult;

public class MembershipJpaQueryAdapter implements MembershipQueryPort {
  private final MembershipJpaRepository repo;

  public MembershipJpaQueryAdapter(MembershipJpaRepository repo) {
    this.repo = repo;
  }

  public List<Membership> findAll() {
    return repo.findAllActive().stream()
        .map(MembershipJpaMapper::toDomain)
        .toList();
  }

  public PageResult<Membership> findAllPaged(
      int page,
      int size,
      String search) {
    Pageable pageable = PageRequest.of(page, size);
    Page<MembershipEntity> entityPage =
        (search != null && !search.isBlank())
            ? repo.searchActive(search, pageable)
            : repo.findAllActive(pageable);
    List<Membership> content =
        entityPage.getContent().stream()
            .map(MembershipJpaMapper::toDomain)
            .toList();
    return new PageResult<>(
        content,
        entityPage.getTotalElements(),
        entityPage.getTotalPages(),
        entityPage.getNumber(),
        entityPage.getSize());
  }

  public Membership findById(Long id) {
    return repo.findActiveById(id)
        .map(MembershipJpaMapper::toDomain)
        .orElseThrow(() -> new MembershipNotFoundException(id));
  }
}
