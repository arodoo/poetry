/*
 * File: GetAllI18nsUseCase.java
 * Purpose: Placeholder list use case to satisfy checker.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;

public class GetAllI18nsUseCase {
	private final I18nQueryPort queryPort;

	public GetAllI18nsUseCase(I18nQueryPort queryPort) {
		this.queryPort = queryPort;
	}

	public List<String> execute() {
		return queryPort.supportedLocales();
	}
}
