/*
 * File: ZonesDeleteController.java
 * Purpose: Placeholder delete controller for backward-compat routing.
 * Delegates behavior to `ZoneController` in production. Maintains module
 * structure expectations for legacy routes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.zone.usecase.DeleteZoneUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Zones")
@RestController
@RequestMapping("/api/v1/zones")
public class ZonesDeleteController {
	private final DeleteZoneUseCase deleteZone;

	public ZonesDeleteController(DeleteZoneUseCase deleteZone) {
		this.deleteZone = deleteZone;
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('admin')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@Operation(summary = "Delete zone (soft delete)", operationId = "deleteZone")
	public void delete(@PathVariable Long id, @RequestParam long version) {
		deleteZone.execute(id, version);
	}
}
