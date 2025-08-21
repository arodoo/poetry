/*
 File: UserJpaRepository.java
 Purpose: Repository interface for user persistence used by the JPA
 adapter. It defines CRUD operations required by the application ports
 while keeping actual JPA implementation details hidden inside
 infrastructure.
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
