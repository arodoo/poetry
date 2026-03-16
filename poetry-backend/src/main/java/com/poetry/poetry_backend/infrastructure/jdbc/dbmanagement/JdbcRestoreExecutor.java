/*
 * File: JdbcRestoreExecutor.java
 * Purpose: Executes the restore sequence: truncates all tables,
 * runs parsed SQL statements, and tracks which tables were
 * restored. Extracted from JdbcSqlRestoreAdapter for size.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.sql.*;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import com.poetry.poetry_backend.application.dbmanagement.model.RestoreResult;

class JdbcRestoreExecutor {
  private final Connection conn;

  JdbcRestoreExecutor(Connection conn) {
    this.conn = conn;
  }

  RestoreResult execute(List<String> stmts)
      throws SQLException {
    JdbcFkConstraintHelper fk =
        new JdbcFkConstraintHelper(conn);
    fk.disableForeignKeys();
    truncateAllTables();
    Set<String> tables = new TreeSet<>();
    executeStatements(stmts, tables);
    fk.enableForeignKeys();
    conn.commit();
    return new RestoreResult(
        tables.size(), "success");
  }

  private void truncateAllTables()
      throws SQLException {
    List<String> names =
        new JdbcTableNamesFetcher(conn).fetch();
    try (Statement stmt = conn.createStatement()) {
      for (String t : names) {
        stmt.execute( // i18n-ignore: SQL DDL
            "TRUNCATE TABLE \"" + t + "\" CASCADE");
      }
    }
  }

  private void executeStatements(
      List<String> stmts, Set<String> tables)
      throws SQLException {
    try (Statement stmt = conn.createStatement()) {
      for (String sql : stmts) {
        stmt.execute(sql);
        extractTableName(sql, tables);
      }
    }
  }

  private void extractTableName(
      String sql, Set<String> tables) {
    String upper = sql.toUpperCase().trim();
    if (upper.startsWith("INSERT INTO")
        || upper.startsWith("CREATE TABLE")) {
      int q1 = sql.indexOf('"');
      int q2 = sql.indexOf('"', q1 + 1);
      if (q1 >= 0 && q2 > q1) {
        tables.add(sql.substring(q1 + 1, q2));
      }
    }
  }
}
