/*
 * File: DataDumpExporter.java
 * Purpose: Exports full database dump (schema + data) to SQL file.
 * Uses JDBC metadata to query all tables and generate INSERT statements.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.export;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.infrastructure.jpa.autobackup.AutoBackupEntity;
import com.poetry.poetry_backend.infrastructure.jpa.autobackup.AutoBackupJpaRepository;

@Component
@Order(2)
public class DataDumpExporter {
  private static final Logger log = LoggerFactory.getLogger(DataDumpExporter.class);

  @Value("${db.export.enabled:true}")
  private boolean enabled;

  private final DataSource dataSource;
  private final AutoBackupJpaRepository backupRepo;

  public DataDumpExporter(DataSource dataSource, AutoBackupJpaRepository backupRepo) {
    this.dataSource = dataSource;
    this.backupRepo = backupRepo;
  }

  public void exportDump() {
    if (!enabled) {
      log.info("Data dump export disabled");
      return;
    }
    if (hasBackupToday()) {
      log.info("Auto backup already exists for today, skipping");
      return;
    }
    try {
      String timestamp = Instant.now().atZone(ZoneId.systemDefault())
          .format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HHmmss"));
      String fileName = "backup_" + timestamp + ".sql";
      Path backupDir = Paths.get("logs/db/backups");
      Files.createDirectories(backupDir);
      Path backupPath = backupDir.resolve(fileName);
      new DataDumpHelper(dataSource, backupPath.toString()).export();
      log.info("Data dump exported to: {}", backupPath);
      saveBackupRecord(backupPath, fileName);
    } catch (Exception e) {
      log.error("Data dump export failed: {}", e.getMessage());
    }
  }

  private boolean hasBackupToday() {
    LocalDate today = LocalDate.now(ZoneId.systemDefault());
    return backupRepo.findAll().stream()
        .map(e -> e.getGeneratedAt().atZone(ZoneId.systemDefault()).toLocalDate())
        .anyMatch(date -> date.equals(today));
  }

  private void saveBackupRecord(Path path, String fileName) {
    try {
      if (!Files.exists(path)) {
        log.warn("Dump file not found, skipping record save");
        return;
      }
      long size = Files.size(path);
      Instant generatedAt = Files.getLastModifiedTime(path).toInstant();
      AutoBackupEntity entity = new AutoBackupEntity(fileName, path.toString(), size, generatedAt);
      backupRepo.save(entity);
      log.info("Auto backup record saved: {}", fileName);
    } catch (IOException e) {
      log.error("Failed to save backup record: {}", e.getMessage());
    }
  }
}
