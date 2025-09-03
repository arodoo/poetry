/*
 * File: CreateI18nUseCase.java
 * Purpose: Application service to create or replace the singleton i18n configuration
 * (default + supported locales) via the command port backed by persistence.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

public class CreateI18nUseCase {
	private final I18nCommandPort commandPort;

	public CreateI18nUseCase(I18nCommandPort commandPort) {
		this.commandPort = commandPort;
	}

	public I18n execute(I18n i18n) {
		return commandPort.create(i18n);
	}
}
