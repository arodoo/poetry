/*
 * File: JdbcBackupDataWriter.java
 * Purpose: Writes INSERT statements for a single table to the
 * backup output stream. Handles column types and proper SQL
 * escaping for PostgreSQL compatibility.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.io.PrintWriter;
import java.sql.*;

class JdbcBackupDataWriter {
  private final Connection conn;
  private final PrintWriter writer;
  private final String tableName;

  JdbcBackupDataWriter(
      Connection c, PrintWriter w, String t) {
    this.conn = c;
    this.writer = w;
    this.tableName = t;
  }

  void write() throws SQLException {
    writer.println("-- Data: " + tableName);
    // i18n-ignore: JPQL
    String sql = "SELECT * FROM \"" + tableName + "\"";
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
      ResultSetMetaData meta = rs.getMetaData();
      int cols = meta.getColumnCount();
      while (rs.next()) {
        writeInsert(rs, meta, cols);
      }
    }
    writer.println();
  }

  private void writeInsert(
      ResultSet rs, ResultSetMetaData m, int cols)
      throws SQLException {
    StringBuilder sb = new StringBuilder();
    sb.append("INSERT INTO \"")
        .append(tableName)
        .append("\" VALUES (");
    for (int i = 1; i <= cols; i++) {
      if (i > 1) sb.append(", ");
      sb.append(formatValue(rs, m, i));
    }
    sb.append(");");
    writer.println(sb);
  }

  private String formatValue(
      ResultSet rs, ResultSetMetaData m, int i)
      throws SQLException {
    Object val = rs.getObject(i);
    if (val == null) return "NULL";
    int type = m.getColumnType(i);
    if (isNumeric(type)) return val.toString();
    if (type == Types.BOOLEAN) return val.toString();
    String str = val.toString().replace("'", "''");
    return "'" + str + "'";
  }

  private boolean isNumeric(int type) {
    return type == Types.INTEGER
        || type == Types.BIGINT
        || type == Types.DECIMAL
        || type == Types.NUMERIC
        || type == Types.DOUBLE
        || type == Types.FLOAT;
  }
}
