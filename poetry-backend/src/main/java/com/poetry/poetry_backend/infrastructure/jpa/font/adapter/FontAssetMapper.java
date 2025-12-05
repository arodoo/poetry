/*
 * File: FontAssetMapper.java
 * Purpose: Map between FontAsset domain and JPA entity.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.font.adapter;

import java.util.ArrayList;

import com.poetry.poetry_backend.domain.font.model.FontAsset;
import com.poetry.poetry_backend.infrastructure.jpa.font.entity.FontAssetEntity;

public class FontAssetMapper {
	public static FontAssetEntity toEntity(FontAsset asset) {
		FontAssetEntity e = new FontAssetEntity();
		if (asset.id() != null) {
			e.setId(asset.id());
		}
		e.setKey(asset.key());
		e.setLabel(asset.label());
		e.setWoff2Url(asset.woff2Url());
		e.setWeights(new ArrayList<>(asset.weights()));
		e.setHash(asset.hash());
		e.setPreloadDefault(asset.preloadDefault());
		e.setActive(asset.active());
		e.setIntegrity(asset.integrity());
		return e;
	}

	public static FontAsset toDomain(FontAssetEntity e) {
		return new FontAsset(
				e.getId(),
				e.getKey(),
				e.getLabel(),
				e.getWoff2Url(),
				java.util.List.copyOf(e.getWeights()),
				e.getHash(),
				e.isPreloadDefault(),
				e.isActive(),
				e.getIntegrity());
	}
}
