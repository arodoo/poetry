/*
 * File: UpdateI18nUseCase.java
 * Purpose: Application service to mutate the persisted singleton i18n configuration
 * identified by its database id.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

public class UpdateI18nUseCase {
	private final I18nCommandPort commandPort;

	public UpdateI18nUseCase(I18nCommandPort commandPort) {
		this.commandPort = commandPort;
	}

	public I18n execute(Long id, I18n i18n) {
		return commandPort.update(id, i18n);
	}
}
