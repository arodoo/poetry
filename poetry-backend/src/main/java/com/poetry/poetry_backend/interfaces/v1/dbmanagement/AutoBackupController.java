/*
 * File: AutoBackupController.java
 * Purpose: REST controller for auto backup list.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.poetry.poetry_backend.application.dbmanagement.service.AutoBackupQueryService;
import com.poetry.poetry_backend.domain.shared.model.PageResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "db-management")
@RestController
@RequestMapping("/api/v1/db-management/backup")
public class AutoBackupController {
  private final AutoBackupQueryService service;
  private static final List<String> SORTABLE = List.of("fileName", "sizeBytes", "generatedAt", "createdAt");

  public AutoBackupController(AutoBackupQueryService service) { this.service = service; }

  @Operation(operationId = "listAutoBackups", summary = "List auto backups")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/auto/list")
  public ResponseEntity<PageResult<BackupInfo>> listBackups(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "generatedAt,desc") String sort) {
    String sortField = "generatedAt";
    var direction = "desc";
    if (sort != null && !sort.isBlank()) {
      String[] parts = sort.split(",", 2);
      if (SORTABLE.contains(parts[0].trim())) {
        sortField = parts[0].trim();
        if (parts.length > 1 && "asc".equalsIgnoreCase(parts[1].trim())) direction = "asc";
      }
    }
    return ResponseEntity.ok(service.listBackups(page, size, search, sortField, direction));
  }
}
