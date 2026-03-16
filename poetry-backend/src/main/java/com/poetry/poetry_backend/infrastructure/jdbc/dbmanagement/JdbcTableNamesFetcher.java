/*
 * File: JdbcTableNamesFetcher.java
 * Purpose: Shared helper that fetches all public schema table
 * names from PostgreSQL via JDBC metadata. Used by multiple
 * adapters to avoid duplicating table discovery logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

class JdbcTableNamesFetcher {
  private final Connection conn;

  JdbcTableNamesFetcher(Connection conn) {
    this.conn = conn;
  }

  List<String> fetch() throws SQLException {
    List<String> tables = new ArrayList<>();
    DatabaseMetaData meta = conn.getMetaData();
    try (ResultSet rs = meta.getTables(
        null, "public", "%",
        new String[]{"TABLE"})) {
      while (rs.next()) {
        tables.add(rs.getString("TABLE_NAME"));
      }
    }
    return tables;
  }
}
