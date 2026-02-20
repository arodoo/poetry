/*
 * File: UserDemographicsJpaRepository.java
 * Purpose: Spring Data repository for UserDemographicsEntity.
 * Primary lookup is by userId due to the 1:1 relationship.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.userdemographics;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDemographicsJpaRepository
    extends JpaRepository<UserDemographicsEntity, Long> {
  Optional<UserDemographicsEntity> findByUserId(Long userId);
}
