/*
 * File: MembershipJpaRepository.java
 * Purpose: Repository interface for membership persistence used by JPA
 * adapter defining CRUD operations required by application ports while
 * keeping JPA implementation details hidden inside infrastructure layer.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MembershipJpaRepository
    extends JpaRepository<MembershipEntity, Long> {
  @Query("SELECT m FROM MembershipEntity m "
      + "WHERE m.deletedAt IS NULL "
      + "ORDER BY m.createdAt DESC")
  List<MembershipEntity> findAllActive();

  @Query("SELECT m FROM MembershipEntity m "
      + "WHERE m.deletedAt IS NULL "
      + "ORDER BY m.createdAt DESC")
  Page<MembershipEntity> findAllActive(Pageable pageable);

  @Query("SELECT m FROM MembershipEntity m "
      + "WHERE m.deletedAt IS NULL "
      + "AND (CAST(m.userId AS string) LIKE %:search% "
      + "OR m.sellerCode LIKE %:search%) "
      + "ORDER BY m.createdAt DESC")
  Page<MembershipEntity> searchActive(String search, Pageable pageable);

  @Query("SELECT m FROM MembershipEntity m "
      + "WHERE m.id = :id AND m.deletedAt IS NULL")
  Optional<MembershipEntity> findActiveById(Long id);
}
