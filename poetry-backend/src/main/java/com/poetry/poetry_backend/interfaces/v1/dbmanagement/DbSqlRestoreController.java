/*
 * File: DbSqlRestoreController.java
 * Purpose: REST controller for restoring the database from an
 * uploaded SQL backup file. Accepts multipart file upload and
 * returns the result of the restore operation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.poetry.poetry_backend.application.dbmanagement.model.RestoreResult;
import com.poetry.poetry_backend.application.dbmanagement.usecase.RestoreDatabaseUseCase;
import com.poetry.poetry_backend.interfaces.v1.dbmanagement.DbManagementDtos.RestoreResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "db-management")
@RestController
@RequestMapping("/api/v1/db-management")
public class DbSqlRestoreController {
  private final RestoreDatabaseUseCase useCase;

  public DbSqlRestoreController(
      RestoreDatabaseUseCase useCase) {
    this.useCase = useCase;
  }

  @Operation(
      operationId = "restoreDb",
      summary = "Restore database from SQL backup")
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping("/restore")
  public ResponseEntity<RestoreResponse> restore(
      @RequestParam("file") MultipartFile file)
      throws IOException {
    RestoreResult result =
        useCase.execute(file.getInputStream());
    return ResponseEntity.ok(
        RestoreResponse.from(result));
  }
}
