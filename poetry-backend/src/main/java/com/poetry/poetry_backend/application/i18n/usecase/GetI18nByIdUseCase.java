/*
 * File: GetI18nByIdUseCase.java
 * Purpose: Placeholder get-by-id use case (no real lookup yet).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;


import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

/**
 * Retrieves a persisted I18n aggregate by identifier. Currently the domain model
 * represents a singleton policy; we still implement id-based retrieval to align
 * with blueprint expectations. If multiple records existed, repository lookup would
 * occur; for now we synthesize only when id == 1 and fail otherwise.
 */
public class GetI18nByIdUseCase {
	private final I18nQueryPort port;

	public GetI18nByIdUseCase(I18nQueryPort port) {
		this.port = port;
	}

	public I18n execute(Long id) {
		if (id == null || id.longValue() != 1L) {
			throw new IllegalArgumentException("i18n.notFound");
		}
		return I18n.of(port.defaultLocale(), port.supportedLocales());
	}
}
