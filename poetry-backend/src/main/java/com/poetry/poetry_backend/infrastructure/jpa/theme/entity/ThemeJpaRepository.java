/*
 * File: ThemeJpaRepository.java
 * Purpose: Spring Data repository for ThemeEntity with soft delete
 * aware queries.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.theme.entity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ThemeJpaRepository extends JpaRepository<ThemeEntity, Long> {
  @Query("select t from ThemeEntity t where t.deletedAt is null")
  List<ThemeEntity> findAllActive();
  @Query("select t from ThemeEntity t where t.id = ?1 and t.deletedAt is null")
  Optional<ThemeEntity> findActiveById(Long id);
  @Query("select t from ThemeEntity t where t.active = true and t.deletedAt is null")
  Optional<ThemeEntity> findActive();

  @Modifying
  @Query("update ThemeEntity t set t.active = false where t.active = true and t.deletedAt is null")
  int bulkDeactivateAllActive();
}
