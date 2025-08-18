/*
 Spring Data repository for the user aggregate persisted as UserEntity.
 Custom queries are scoped to active users to filter out soft‑deleted
 records. The repository belongs to infrastructure and is injected via
 ports into application services. All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserJpaRepository extends JpaRepository<UserEntity, Long> {
  @Query("select u from UserEntity u where u.active = true")
  List<UserEntity> findAllActive();

  @Query("select u from UserEntity u where u.id = :id and u.active = true")
  Optional<UserEntity> findActiveById(Long id);
}
