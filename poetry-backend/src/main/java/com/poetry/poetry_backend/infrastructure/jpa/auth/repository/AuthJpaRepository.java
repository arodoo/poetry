/*
 * File: AuthJpaRepository.java
 * Purpose: Spring Data repository for Auth entities.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poetry.poetry_backend.infrastructure.jpa.auth.entity.AuthEntity;

public interface AuthJpaRepository extends JpaRepository<AuthEntity, String> {
  List<AuthEntity> findByDeletedFalse();
}
