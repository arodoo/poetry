/*
 * File: DataDumpHelper.java
 * Purpose: Helper that queries all tables via JDBC metadata and
 * generates INSERT statements for each row. Handles column types
 * and escaping for PostgreSQL compatibility.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import java.io.File;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

class DataDumpHelper {
  private final DataSource dataSource;
  private final String outputPath;

  DataDumpHelper(DataSource dataSource, String outputPath) {
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
        exportTable(conn, writer, table);
      }
    }
  }

  private void writeHeader(PrintWriter w) {
    w.println("-- Poetry Database Full Dump");
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

  private void exportTable(Connection c, PrintWriter w, String t)
      throws SQLException {
    new TableDumpWriter(c, w, t).write();
  }

  private void ensureDirectoryExists() {
    File file = new File(outputPath);
    File parent = file.getParentFile();
    if (parent != null && !parent.exists()) {
      parent.mkdirs();
    }
  }
}
