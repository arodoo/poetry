/*
 * File: TableSchemaWriter.java
 * Purpose: Writes CREATE TABLE DDL for a single table using JDBC
 * metadata. Generates column definitions, constraints and indexes
 * for PostgreSQL compatibility.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.export;

import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

class TableSchemaWriter {
  private final Connection conn;
  private final PrintWriter writer;
  private final String tableName;

  TableSchemaWriter(Connection conn, PrintWriter writer, String tableName) {
    this.conn = conn;
    this.writer = writer;
    this.tableName = tableName;
  }

  void write() throws SQLException {
    writer.println("-- Table: " + tableName);
    writer.print("CREATE TABLE \"" + tableName + "\" (");
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

  private List<String> getColumnDefs() throws SQLException {
    List<String> cols = new ArrayList<>();
    DatabaseMetaData meta = conn.getMetaData();
    try (ResultSet rs = meta.getColumns(null, "public", tableName, "%")) {
      while (rs.next()) {
        String name = rs.getString("COLUMN_NAME");
        String type = rs.getString("TYPE_NAME");
        int size = rs.getInt("COLUMN_SIZE");
        String nullable = rs.getInt("NULLABLE") == 0 ? " NOT NULL" : "";
        String def = formatColumn(name, type, size, nullable);
        cols.add(def);
      }
    }
    return cols;
  }

  private String formatColumn(String n, String t, int s, String nl) {
    if (t.contains("int") || t.contains("bool") || t.contains("time")) {
      return "\"" + n + "\" " + t + nl;
    }
    return "\"" + n + "\" " + t + "(" + s + ")" + nl;
  }
}
