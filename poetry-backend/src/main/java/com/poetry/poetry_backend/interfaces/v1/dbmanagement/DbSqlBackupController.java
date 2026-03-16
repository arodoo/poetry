/*
 * File: DbSqlBackupController.java
 * Purpose: REST controller for generating a full SQL backup of
 * the database. Returns a downloadable SQL file containing
 * schema DDL and INSERT statements for all tables.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.dbmanagement.usecase.BackupDatabaseUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "db-management")
@RestController
@RequestMapping("/api/v1/db-management")
public class DbSqlBackupController {
  private final BackupDatabaseUseCase useCase;

  public DbSqlBackupController(
      BackupDatabaseUseCase useCase) {
    this.useCase = useCase;
  }

  @Operation(
      operationId = "backupDb",
      summary = "Generate full SQL backup")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/backup")
  public ResponseEntity<byte[]> backup() {
    byte[] bytes = useCase.execute();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentDisposition(
        ContentDisposition.attachment()
            .filename("poetry-backup.sql")
            .build());
    headers.setContentType(
        MediaType.APPLICATION_OCTET_STREAM);
    return new ResponseEntity<>(
        bytes, headers, HttpStatus.OK);
  }
}
