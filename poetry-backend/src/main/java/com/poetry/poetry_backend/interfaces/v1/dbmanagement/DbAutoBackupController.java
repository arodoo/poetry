/*
 * File: DbAutoBackupController.java
 * Purpose: REST controller for serving the auto-generated backup
 * from application startup. Returns the SQL file containing
 * schema and data that was generated on app initialization.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "db-management")
@RestController
@RequestMapping("/api/v1/db-management/backup")
public class DbAutoBackupController {

  @Value("${db.export.dump-path:logs/db/dump.sql}")
  private String dumpPath;

  @Operation(
      operationId = "getAutoBackupInfo",
      summary = "Get auto backup file info")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/auto/info")
  public ResponseEntity<BackupInfo> getAutoBackupInfo() {
    try {
      Path path = Paths.get(dumpPath);
      if (!Files.exists(path)) {
        return ResponseEntity.notFound().build();
      }
      long size = Files.size(path);
      long modified = Files.getLastModifiedTime(path).toMillis();
      BackupInfo info = new BackupInfo(
          path.getFileName().toString(),
          modified,
          size
      );
      return ResponseEntity.ok(info);
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
  }

  @Operation(
      operationId = "downloadAutoBackup",
      summary = "Download auto-generated backup file")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/auto")
  public ResponseEntity<byte[]> downloadAutoBackup() {
    try {
      Path path = Paths.get(dumpPath);
      if (!Files.exists(path)) {
        return ResponseEntity.notFound().build();
      }
      byte[] bytes = Files.readAllBytes(path);
      HttpHeaders headers = new HttpHeaders();
      headers.setContentDisposition(
          ContentDisposition.attachment()
              .filename(path.getFileName().toString())
              .build());
      headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
      return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    } catch (IOException e) {
      return ResponseEntity.internalServerError().build();
    }
  }

  public static class BackupInfo {
    public String fileName;
    public long generatedAt;
    public long sizeBytes;

    public BackupInfo() {}

    public BackupInfo(String fileName, long generatedAt, long sizeBytes) {
      this.fileName = fileName;
      this.generatedAt = generatedAt;
      this.sizeBytes = sizeBytes;
    }
  }
}
