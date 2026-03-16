/*
 * File: JdbcBackupSchemaWriter.java
 * Purpose: Writes CREATE TABLE DDL for a single table to the
 * backup output stream. Uses JDBC metadata to discover column
 * definitions and generates PostgreSQL-compatible DDL.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

class JdbcBackupSchemaWriter {
  private final Connection conn;
  private final PrintWriter writer;
  private final String tableName;

  JdbcBackupSchemaWriter(
      Connection c, PrintWriter w, String t) {
    this.conn = c;
    this.writer = w;
    this.tableName = t;
  }

  void write() throws SQLException {
    writer.println("-- Table: " + tableName);
    writer.print( // i18n-ignore: SQL DDL
        "CREATE TABLE IF NOT EXISTS \""
            + tableName + "\" (");
    List<String> cols = getColumnDefs();
    writer.println();
    for (int i = 0; i < cols.size(); i++) {
      writer.print("  " + cols.get(i));
      if (i < cols.size() - 1) writer.print(",");
      writer.println();
    }
    writer.println(");");
    writer.println();
  }

  private List<String> getColumnDefs()
      throws SQLException {
    List<String> cols = new ArrayList<>();
    DatabaseMetaData meta = conn.getMetaData();
    try (ResultSet rs = meta.getColumns(
        null, "public", tableName, "%")) {
      while (rs.next()) {
        cols.add(formatColumn(rs));
      }
    }
    return cols;
  }

  private String formatColumn(ResultSet rs)
      throws SQLException {
    String name = rs.getString("COLUMN_NAME");
    String type = rs.getString("TYPE_NAME");
    int size = rs.getInt("COLUMN_SIZE");
    String nl = rs.getInt("NULLABLE") == 0
        ? " NOT NULL" : "";
    if (type.contains("int")
        || type.contains("bool")
        || type.contains("time")) {
      return "\"" + name + "\" " + type + nl;
    }
    return "\"" + name + "\" "
        + type + "(" + size + ")" + nl;
  }
}
