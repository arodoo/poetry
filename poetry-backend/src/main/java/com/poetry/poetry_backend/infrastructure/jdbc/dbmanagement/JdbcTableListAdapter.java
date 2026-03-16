/*
 * File: JdbcTableListAdapter.java
 * Purpose: JDBC adapter implementing DbTableListPort. Queries
 * PostgreSQL metadata to list all public schema tables with
 * their row counts for the database management feature.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import com.poetry.poetry_backend.application.dbmanagement.port.DbTableListPort;
import com.poetry.poetry_backend.domain.dbmanagement.model.TableInfo;

public class JdbcTableListAdapter implements DbTableListPort {
  private final DataSource dataSource;

  public JdbcTableListAdapter(DataSource ds) {
    this.dataSource = ds;
  }

  @Override
  public List<TableInfo> listTables() {
    try (Connection conn = dataSource.getConnection()) {
      return fetchTables(conn);
    } catch (SQLException e) {
      throw new RuntimeException( // i18n-ignore: internal
          "Failed to list tables", e);
    }
  }

  private List<TableInfo> fetchTables(Connection conn)
      throws SQLException {
    List<String> names = getTableNames(conn);
    List<TableInfo> result = new ArrayList<>();
    for (String name : names) {
      long count = getRowCount(conn, name);
      result.add(new TableInfo(name, count));
    }
    return result;
  }

  private List<String> getTableNames(Connection conn)
      throws SQLException {
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

  private long getRowCount(Connection conn, String table)
      throws SQLException {
    // i18n-ignore: JPQL
    String sql = "SELECT COUNT(*) FROM \"" + table + "\"";
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
      return rs.next() ? rs.getLong(1) : 0;
    }
  }
}
