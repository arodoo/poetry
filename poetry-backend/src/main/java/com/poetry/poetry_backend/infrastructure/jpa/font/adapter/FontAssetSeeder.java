/*
 * File: FontAssetSeeder.java
 * Purpose: Seed initial font assets with single preload default.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.font.adapter;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.font.port.FontAssetCommandPort;
import com.poetry.poetry_backend.application.font.port.FontAssetQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

@Transactional
public class FontAssetSeeder {
	private final FontAssetQueryPort query;
	private final FontAssetCommandPort command;

	public FontAssetSeeder(FontAssetQueryPort query, FontAssetCommandPort command) {
		this.query = query;
		this.command = command;
	}

	public void seed() {
		if (!query.findAllActive().isEmpty()) {
			return;
		}
		// exactly one preloadDefault
		List<FontAsset> defaults = List.of(
				FontAsset.createNew(
						"inter",
						"Inter",
						"https://cdn.myapp.com/fonts/inter.woff2",
						List.of(400, 500, 700),
						"hash-inter",
						true,
						"sha256-hash-inter"),
				FontAsset.createNew(
						"roboto",
						"Roboto",
						"https://cdn.myapp.com/fonts/roboto.woff2",
						List.of(400, 500, 700),
						"hash-roboto",
						false,
						"sha256-hash-roboto"));
		defaults.forEach(command::save);
	}
}
