/*
 File: UserJpaRepository.java
 Purpose: Spring Data repository for UserEntity with soft-delete support.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.jpa.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserEntity, Long> {
    @Query("select u from UserEntity u where u.active = true")
    List<UserEntity> findAllActive();
    @Query("select u from UserEntity u where u.id = :id and u.active = true")
    Optional<UserEntity> findActiveById(Long id);
}
