/*
 * File: SellerCodeJpaRepository.java
 * Purpose: Repository interface for seller code persistence used by JPA
 * adapter defining CRUD operations required by application ports while keeping
 * JPA implementation details hidden inside infrastructure layer ensuring clean
 * separation of concerns.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SellerCodeJpaRepository extends JpaRepository<SellerCodeEntity, Long> {
  @Query("select sc from SellerCodeEntity sc where sc.deletedAt is null")
  List<SellerCodeEntity> findAllActive();

  @Query("select sc from SellerCodeEntity sc where sc.deletedAt is null")
  Page<SellerCodeEntity> findAllActive(Pageable pageable);

  @Query("select sc from SellerCodeEntity sc where sc.deletedAt is null and (lower(sc.code) like lower(concat('%', :search, '%')) or lower(sc.organizationId) like lower(concat('%', :search, '%')))")
  Page<SellerCodeEntity> searchActive(String search, Pageable pageable);

  @Query("select sc from SellerCodeEntity sc where sc.id = :id and sc.deletedAt is null")
  Optional<SellerCodeEntity> findActiveById(Long id);

  @Query("select sc from SellerCodeEntity sc where sc.code = :code and sc.deletedAt is null")
  Optional<SellerCodeEntity> findActiveByCode(String code);
}
