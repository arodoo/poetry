/*
 * File: ZonesGetController.java
 * Purpose: Placeholder get controller for legacy route compatibility.
 * Implementation is intentionally minimal and delegates to the main
 * `ZoneController`.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.zone.usecase.GetAllZonesUseCase;
import com.poetry.poetry_backend.application.zone.usecase.GetZoneByIdUseCase;
import com.poetry.poetry_backend.domain.zone.model.Zone;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Zones")
@RestController
@RequestMapping("/api/v1/zones")
public class ZonesGetController {
	private final GetAllZonesUseCase getAllZones;
	private final GetZoneByIdUseCase getZoneById;

	public ZonesGetController(GetAllZonesUseCase getAllZones, GetZoneByIdUseCase getZoneById) {
		this.getAllZones = getAllZones;
		this.getZoneById = getZoneById;
	}

	@GetMapping
	@PreAuthorize("hasAnyAuthority('admin', 'manager')")
	public List<ZoneDto.ZoneResponse> listAll() {
		return getAllZones.execute().stream().map(ZoneDto::toResponse).toList();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('admin', 'manager')")
	public ZoneDto.ZoneResponse getById(@PathVariable Long id) {
		Zone z = getZoneById.execute(id);
		return ZoneDto.toResponse(z);
	}
}
