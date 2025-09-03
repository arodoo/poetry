/*
 * File: DeleteI18nUseCase.java
 * Purpose: Application service to remove the persisted singleton i18n configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;

public class DeleteI18nUseCase {
	private final I18nCommandPort commandPort;

	public DeleteI18nUseCase(I18nCommandPort commandPort) {
		this.commandPort = commandPort;
	}

	public void execute(Long id) {
		commandPort.delete(id);
	}
}
