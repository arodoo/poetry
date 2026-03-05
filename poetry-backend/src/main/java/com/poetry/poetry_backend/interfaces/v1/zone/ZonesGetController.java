/*
 * File: ZonesGetController.java
 * Purpose: Placeholder get controller for legacy route compatibility.
 * Implementation is intentionally minimal and delegates to the main
 * `ZoneController`.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.zone.usecase.GetAllZonesUseCase;
import com.poetry.poetry_backend.application.zone.usecase.GetZoneByIdUseCase;
import com.poetry.poetry_backend.domain.zone.model.Zone;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Zones")
@RestController
@RequestMapping("/api/v1/zones")
public class ZonesGetController {
	private final GetAllZonesUseCase getAllZones;
	private final GetZoneByIdUseCase getZoneById;
	private final UserJpaRepository userRepo;

	public ZonesGetController(
			GetAllZonesUseCase getAllZones,
			GetZoneByIdUseCase getZoneById,
			UserJpaRepository userRepo) {
		this.getAllZones = getAllZones;
		this.getZoneById = getZoneById;
		this.userRepo = userRepo;
	}

	@GetMapping
	@PreAuthorize("hasAnyAuthority('admin', 'manager')")
	public List<ZoneResponse> listAll() {
		List<Zone> zones = getAllZones.execute();
		Map<Long, String> names = resolveUsernames(zones);
		return zones.stream()
				.map(z -> ZoneResponse.withManager(
						z, names.getOrDefault(z.managerId(), "")))
				.toList();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('admin', 'manager')")
	public ZoneResponse getById(@PathVariable Long id) {
		Zone z = getZoneById.execute(id);
		String name = userRepo.findById(z.managerId())
				.map(UserEntity::getUsername).orElse("");
		return ZoneResponse.withManager(z, name);
	}

	private Map<Long, String> resolveUsernames(List<Zone> zones) {
		List<Long> ids = zones.stream()
				.map(Zone::managerId).distinct().toList();
		return userRepo.findAllById(ids).stream()
				.collect(Collectors.toMap(
						UserEntity::getId,
						UserEntity::getUsername));
	}
}
