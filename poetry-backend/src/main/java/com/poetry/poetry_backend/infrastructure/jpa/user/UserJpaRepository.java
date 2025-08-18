/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
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
