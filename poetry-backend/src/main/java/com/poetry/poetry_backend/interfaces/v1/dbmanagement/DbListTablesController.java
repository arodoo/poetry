/*
 * File: DbListTablesController.java
 * Purpose: REST controller exposing the database table listing
 * endpoint. Returns all public schema tables with row counts
 * for admin users to select tables for export.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.dbmanagement.usecase.ListTablesUseCase;
import com.poetry.poetry_backend.interfaces.v1.dbmanagement.DbManagementDtos.TableInfoResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "db-management",
    description = "Database management operations")
@RestController
@RequestMapping("/api/v1/db-management")
public class DbListTablesController {
  private final ListTablesUseCase useCase;

  public DbListTablesController(
      ListTablesUseCase useCase) {
    this.useCase = useCase;
  }

  @Operation(
      operationId = "listDbTables",
      summary = "List all database tables")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/tables")
  public ResponseEntity<List<TableInfoResponse>> list() {
    List<TableInfoResponse> tables = useCase.execute()
        .stream()
        .map(TableInfoResponse::from)
        .toList();
    return ResponseEntity.ok(tables);
  }
}
