/*
 * File: AutoBackupOpsController.java
 * Purpose: REST controller for auto backup operations.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.dbmanagement.service.AutoBackupCommandService;
import com.poetry.poetry_backend.application.dbmanagement.service.AutoBackupQueryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "db-management")
@RestController
@RequestMapping("/api/v1/db-management/backup")
public class AutoBackupOpsController {
  private final AutoBackupQueryService query;
  private final AutoBackupCommandService cmd;

  public AutoBackupOpsController(AutoBackupQueryService query, AutoBackupCommandService cmd) { this.query = query; this.cmd = cmd; }

  @Operation(operationId = "downloadAutoBackup", summary = "Download backup")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/auto/{id}")
  public ResponseEntity<byte[]> downloadBackup(@PathVariable Long id) {
    return query.downloadBackup(id).map(bytes -> {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentDisposition(ContentDisposition.attachment().filename(query.getFileName(id)).build());
      headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
      return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }).orElse(ResponseEntity.notFound().build());
  }

  @Operation(operationId = "deleteAutoBackup", summary = "Delete backup")
  @PreAuthorize("hasAuthority('admin')")
  @DeleteMapping("/auto/{id}")
  public ResponseEntity<Void> deleteBackup(@PathVariable Long id) {
    return cmd.deleteBackup(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
  }

  @Operation(operationId = "restoreToBackup", summary = "Restore to backup")
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping("/auto/{id}/restore")
  public ResponseEntity<Void> restoreToBackup(@PathVariable Long id) {
    return query.getBackupSql(id).isPresent() ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
  }
}
