/*
 * File: SchemaExporter.java
 * Purpose: Exports database schema DDL to a SQL file on startup.
 * Uses JDBC metadata to generate CREATE TABLE statements.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.export;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class SchemaExporter {
  private static final Logger log =
      LoggerFactory.getLogger(SchemaExporter.class);

  @Value("${db.export.enabled:true}")
  private boolean enabled;

  @Value("${db.export.schema-path:logs/db/schema.sql}")
  private String schemaPath;

  private final DataSource dataSource;

  public SchemaExporter(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  public void exportSchema() {
    if (!enabled) {
      log.info("Schema export disabled");
      return;
    }
    try {
      new SchemaExportHelper(dataSource, schemaPath).export();
      log.info("Schema exported to: {}", schemaPath);
    } catch (Exception e) {
      log.error("Schema export failed: {}", e.getMessage());
    }
  }
}
