/*
 * File: SchemaExportHelper.java
 * Purpose: Helper that queries PostgreSQL schema via JDBC metadata
 * and generates CREATE TABLE DDL statements. Avoids Hibernate
 * internals for better compatibility.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import java.io.File;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

class SchemaExportHelper {
  private final DataSource dataSource;
  private final String outputPath;

  SchemaExportHelper(DataSource dataSource, String outputPath) {
    this.dataSource = dataSource;
    this.outputPath = outputPath;
  }

  void export() throws Exception {
    ensureDirectoryExists();
    try (Connection conn = dataSource.getConnection();
         PrintWriter writer = new PrintWriter(outputPath)) {
      writeHeader(writer);
      List<String> tables = getTableNames(conn);
      for (String table : tables) {
        exportTableSchema(conn, writer, table);
      }
    }
  }

  private void writeHeader(PrintWriter w) {
    w.println("-- Poetry Database Schema");
    w.println("-- Generated at: " + java.time.Instant.now());
    w.println();
  }

  private List<String> getTableNames(Connection conn) throws SQLException {
    List<String> tables = new ArrayList<>();
    DatabaseMetaData meta = conn.getMetaData();
    try (ResultSet rs = meta.getTables(
        null, "public", "%", new String[]{"TABLE"})) {
      while (rs.next()) {
        tables.add(rs.getString("TABLE_NAME"));
      }
    }
    return tables;
  }

  private void exportTableSchema(Connection c, PrintWriter w, String t)
      throws SQLException {
    new TableSchemaWriter(c, w, t).write();
  }

  private void ensureDirectoryExists() {
    File file = new File(outputPath);
    File parent = file.getParentFile();
    if (parent != null && !parent.exists()) {
      parent.mkdirs();
    }
  }
}
