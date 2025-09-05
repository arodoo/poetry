/*
 * File: FontJpaAdapter.java
 * Purpose: Placeholder adapter delegating to existing FontAssetJpaAdapter.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.font;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

@Transactional
public class FontJpaAdapter implements FontQueryPort, FontCommandPort {
	private final FontAssetRepository repo;

	public FontJpaAdapter(FontAssetRepository repo) { this.repo = repo; }

	@Override
	public List<FontAsset> findAll() {
		return repo.findAll().stream()
				.filter(e -> e.getDeletedAt() == null)
				.map(FontAssetMapper::toDomain)
				.collect(Collectors.toList());
	}

	@Override
	public Optional<FontAsset> findByKey(String key) {
		return repo.findByKeyAndDeletedAtIsNull(key).map(FontAssetMapper::toDomain);
	}

	@Override
	public FontAsset save(FontAsset asset) {
		FontAssetEntity saved = repo.save(FontAssetMapper.toEntity(asset));
		return FontAssetMapper.toDomain(saved);
	}

	@Override
	public void deleteSoft(Long id) {
		repo.findById(id).ifPresent(e -> {
			e.setActive(false);
			e.setDeletedAt(Instant.now());
			repo.save(e);
		});
	}
}
