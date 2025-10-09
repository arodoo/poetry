/*
 * File: ZoneController.java
 * Purpose: REST controller for zone endpoints exposing CRUD operations
 * following clean architecture and blueprint conventions. Maps DTOs to
 * domain use case invocations and returns typed responses with proper
 * HTTP status codes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.zone;

import static com.poetry.poetry_backend.interfaces.v1.zone.ZoneDtos.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.zone.usecase.*;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.zone.model.Zone;
import com.poetry.poetry_backend.interfaces.v1.shared.PageResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/zones")
@Tag(name = "Zones", description = "Zone management endpoints")
public class ZoneController {
  private final GetAllZonesUseCase getAllZones;
  private final GetZonesPageUseCase getZonesPage;
  private final GetZoneByIdUseCase getZoneById;
  private final CreateZoneUseCase createZone;
  private final UpdateZoneUseCase updateZone;
  private final DeleteZoneUseCase deleteZone;

  public ZoneController(
      GetAllZonesUseCase getAllZones,
      GetZonesPageUseCase getZonesPage,
      GetZoneByIdUseCase getZoneById,
      CreateZoneUseCase createZone,
      UpdateZoneUseCase updateZone,
      DeleteZoneUseCase deleteZone) {
    this.getAllZones = getAllZones;
    this.getZonesPage = getZonesPage;
    this.getZoneById = getZoneById;
    this.createZone = createZone;
    this.updateZone = updateZone;
    this.deleteZone = deleteZone;
  }

  @GetMapping
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @Operation(summary = "List all zones", operationId = "listAllZones")
  public List<ZoneResponse> listAll() {
    return getAllZones.execute().stream().map(ZoneDtos::toResponse).toList();
  }

  @GetMapping("/paged")
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @Operation(summary = "List zones with pagination", operationId = "listPagedZones")
  public PageResponseDto<ZoneResponse> listPaged(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(required = false) String search) {
    PageResult<Zone> result = getZonesPage.execute(page, size, search);
    return PageResponseDto.from(result, ZoneDtos::toResponse);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @Operation(summary = "Get zone by ID", operationId = "getZoneById")
  public ZoneResponse getById(@PathVariable Long id) {
    return toResponse(getZoneById.execute(id));
  }

  @PostMapping
  @PreAuthorize("hasAuthority('admin')")
  @ResponseStatus(HttpStatus.CREATED)
  @Operation(summary = "Create new zone", operationId = "createZone")
  public ZoneResponse create(@RequestBody ZoneCreateRequest request) {
    Zone created =
        createZone.execute(
            request.name(), request.description(), request.managerId());
    return toResponse(created);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAuthority('admin')")
  @Operation(summary = "Update existing zone", operationId = "updateZone")
  public ZoneResponse update(
      @PathVariable Long id, @RequestBody ZoneUpdateRequest request) {
    Zone updated =
        updateZone.execute(
            id,
            request.version(),
            request.name(),
            request.description(),
            request.managerId());
    return toResponse(updated);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('admin')")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @Operation(summary = "Delete zone (soft delete)", operationId = "deleteZone")
  public void delete(@PathVariable Long id, @RequestParam long version) {
    deleteZone.execute(id, version);
  }
}
