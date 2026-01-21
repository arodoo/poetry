/*
 * File: DatabaseExportListener.java
 * Purpose: Application startup listener that triggers schema and
 * data dump exports after all bootstrap seeders have completed.
 * Runs at low priority to capture seeded data.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.export;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(999)
public class DatabaseExportListener {
  private static final Logger log =
      LoggerFactory.getLogger(DatabaseExportListener.class);

  private final SchemaExporter schemaExporter;
  private final DataDumpExporter dataDumpExporter;

  public DatabaseExportListener(
      SchemaExporter schemaExporter,
      DataDumpExporter dataDumpExporter) {
    this.schemaExporter = schemaExporter;
    this.dataDumpExporter = dataDumpExporter;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    log.info("=== Database Export Starting ===");
    schemaExporter.exportSchema();
    dataDumpExporter.exportDump();
    log.info("=== Database Export Complete ===");
  }
}
