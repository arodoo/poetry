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

  private static final java.util.Set<String> SORTABLE = java.util.Set.of(
      "status", "sellerCode", "createdAt",
      "user.firstName", "subscription.name", "sellerInfo.user.firstName");

  private static final java.util.Map<String, String> SORT_MAPPING = java.util.Map.of(
      "userName", "user.firstName",
      "subscriptionName", "subscription.name",
      "sellerName", "sellerInfo.user.firstName");

  public PageResult<Membership> findAllPaged(
      int page,
      int size,
      String search,
      String sort) {
    String actualSort = sort;
    if (sort != null) {
      String[] parts = sort.split(",", 2);
      String field = parts[0].trim();
      if (SORT_MAPPING.containsKey(field)) {
        actualSort = SORT_MAPPING.get(field) + (parts.length > 1 ? "," + parts[1] : "");
      }
    }

    org.springframework.data.domain.Sort ordering = com.poetry.poetry_backend.infrastructure.jpa.common.SortParser
        .parse(actualSort, SORTABLE);
    Pageable pageable = PageRequest.of(page, size, ordering);
    Page<MembershipEntity> entityPage = (search != null && !search.isBlank())
        ? repo.searchActive(search, pageable)
        : repo.findAllActive(pageable);
    List<Membership> content = entityPage.getContent().stream()
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

  public boolean existsActiveMembershipForSubscription(
      Long subscriptionId) {
    return repo.existsActiveBySubscriptionId(subscriptionId);
  }
}
