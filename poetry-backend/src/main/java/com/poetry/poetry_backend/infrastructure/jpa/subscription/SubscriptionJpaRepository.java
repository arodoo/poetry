/*
 * File: SubscriptionJpaRepository.java
 * Purpose: Repository interface for subscription persistence used by JPA
 * adapter. Defines CRUD and query operations required by application
 * ports while keeping JPA implementation details hidden in infrastructure.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.subscription;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubscriptionJpaRepository
    extends JpaRepository<SubscriptionEntity, Long> {
  @Query("select s from SubscriptionEntity s where s.deletedAt is null")
  List<SubscriptionEntity> findAllActive();

  @Query("select s from SubscriptionEntity s where s.deletedAt is null")
  Page<SubscriptionEntity> findAllActive(Pageable pageable);

  @Query(
      "select s from SubscriptionEntity s where s.deletedAt is null and "
          + "(lower(s.name) like lower(concat('%', :search, '%')) or "
          + "lower(s.description) like lower(concat('%', :search, '%')))")
  Page<SubscriptionEntity> searchActive(String search, Pageable pageable);

  @Query(
      "select s from SubscriptionEntity s where s.id = :id "
          + "and s.deletedAt is null")
  Optional<SubscriptionEntity> findActiveById(Long id);

  boolean existsByName(String name);
}
