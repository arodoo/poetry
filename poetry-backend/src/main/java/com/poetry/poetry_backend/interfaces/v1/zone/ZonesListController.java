/*
 * File: ZonesListController.java
 * Purpose: Placeholder list controller for zone routes. Keeps module
 * structure intact for older parts of the codebase while the primary
 * `ZoneController` provides full functionality.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.zone.usecase.GetZonesPageUseCase;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.zone.model.Zone;
import com.poetry.poetry_backend.interfaces.v1.shared.PageResponseDto;

import io.swagger.v3.oas.annotations.tags.Tag;


@Tag(name = "Zones")
@RestController
@RequestMapping("/api/v1/zones")
public class ZonesListController {
	private final GetZonesPageUseCase getZonesPage;

	public ZonesListController(GetZonesPageUseCase getZonesPage) {
		this.getZonesPage = getZonesPage;
	}

	@GetMapping("/paged")
	@PreAuthorize("hasAnyAuthority('admin', 'manager')")
	public PageResponseDto<ZoneDto.ZoneResponse> listPaged(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) String search) {
		PageResult<Zone> result = getZonesPage.execute(page, size, search);
		return PageResponseDto.from(result, ZoneDto::toResponse);
	}
}
