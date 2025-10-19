/*
 * File: ZonesCreateController.java
 * Purpose: Controller for creating zones. Implements endpoint logic
 * directly (decentralized) and invokes the CreateZoneUseCase.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.zone.usecase.CreateZoneUseCase;
import com.poetry.poetry_backend.domain.zone.model.Zone;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Zones")
@RestController
@RequestMapping("/api/v1/zones")
public class ZonesCreateController {
	private final CreateZoneUseCase createZone;

	public ZonesCreateController(CreateZoneUseCase createZone) {
		this.createZone = createZone;
	}

	@PostMapping
	@PreAuthorize("hasAuthority('admin')")
	@ResponseStatus(HttpStatus.CREATED)
	@Operation(summary = "Create new zone", operationId = "createZone")
	public ZoneDto.ZoneResponse create(@RequestBody ZoneDto.ZoneCreateRequest request) {
		Zone created =
				createZone.execute(request.name(), request.description(), request.managerId());
		return ZoneDto.toResponse(created);
	}
}
