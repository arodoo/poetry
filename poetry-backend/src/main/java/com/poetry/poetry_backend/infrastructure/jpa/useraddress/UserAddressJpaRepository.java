/*
 * File: UserAddressJpaRepository.java
 * Purpose: Spring Data repository for UserAddressEntity.
 * Primary lookup is by userId.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.useraddress;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAddressJpaRepository
    extends JpaRepository<UserAddressEntity, Long> {
  Optional<UserAddressEntity> findByUserId(Long userId);
}
