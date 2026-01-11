/*
 * File: DataDumpExporter.java
 * Purpose: Exports full database dump (schema + data) to SQL file.
 * Uses JDBC metadata to query all tables and generate INSERT statements.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;


import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class DataDumpExporter {
  private static final Logger log =
      LoggerFactory.getLogger(DataDumpExporter.class);

  @Value("${db.export.enabled:true}")
  private boolean enabled;

  @Value("${db.export.dump-path:logs/db/dump.sql}")
  private String dumpPath;

  private final DataSource dataSource;

  public DataDumpExporter(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public void exportDump() {
    if (!enabled) {
      log.info("Data dump export disabled");
      return;
    }
    try {
      new DataDumpHelper(dataSource, dumpPath).export();
      log.info("Data dump exported to: {}", dumpPath);
    } catch (Exception e) {
      log.error("Data dump export failed: {}", e.getMessage());
    }
  }
}
