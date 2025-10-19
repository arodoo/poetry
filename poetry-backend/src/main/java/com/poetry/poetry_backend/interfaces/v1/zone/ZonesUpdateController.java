/*
 * File: ZonesUpdateController.java
 * Purpose: Placeholder update controller for zone endpoints. Kept minimal
 * to route requests to the main `ZoneController` implementation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.zone.usecase.UpdateZoneUseCase;
import com.poetry.poetry_backend.domain.zone.model.Zone;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Zones")
@RestController
@RequestMapping("/api/v1/zones")
public class ZonesUpdateController {
	private final UpdateZoneUseCase updateZone;

	public ZonesUpdateController(UpdateZoneUseCase updateZone) {
		this.updateZone = updateZone;
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('admin')")
	@Operation(summary = "Update existing zone", operationId = "updateZone")
	public ZoneDto.ZoneResponse update(
			@PathVariable Long id, @RequestBody ZoneDto.ZoneUpdateRequest request) {
		Zone updated =
				updateZone.execute(
						id,
						request.version(),
						request.name(),
						request.description(),
						request.managerId(),
						request.status());
		return ZoneDto.toResponse(updated);
	}
}
