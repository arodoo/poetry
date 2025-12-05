/*
 * File: FontAssetRepository.java
 * Purpose: Spring Data repository for FontAssetEntity.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.font.entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FontAssetRepository extends JpaRepository<FontAssetEntity, Long> {
	Optional<FontAssetEntity> findByKeyAndDeletedAtIsNull(String key);
	boolean existsByPreloadDefaultTrueAndDeletedAtIsNull();
	java.util.List<FontAssetEntity> findAllByActiveTrueAndDeletedAtIsNull();
}
