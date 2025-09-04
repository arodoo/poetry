/*
 * File: FontAssetJpaAdapter.java
 * Purpose: JPA adapter implementing font asset ports.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.font;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.font.port.FontAssetCommandPort;
import com.poetry.poetry_backend.application.font.port.FontAssetQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

@Transactional
public class FontAssetJpaAdapter implements FontAssetQueryPort, FontAssetCommandPort {
	private final FontAssetRepository repo;

	public FontAssetJpaAdapter(FontAssetRepository repo) { this.repo = repo; }

	@Override
	public List<FontAsset> findAllActive() {
		return repo.findAllByActiveTrueAndDeletedAtIsNull().stream()
				.map(FontAssetMapper::toDomain).collect(Collectors.toList());
	}

	@Override
	public Optional<FontAsset> findByKey(String key) {
		return repo.findByKeyAndDeletedAtIsNull(key).map(FontAssetMapper::toDomain);
	}

	@Override
	public boolean existsPreloadDefault() {
		return repo.existsByPreloadDefaultTrueAndDeletedAtIsNull();
	}

	@Override
	public FontAsset save(FontAsset asset) {
		FontAssetEntity saved = repo.save(FontAssetMapper.toEntity(asset));
		return FontAssetMapper.toDomain(saved);
	}
}
