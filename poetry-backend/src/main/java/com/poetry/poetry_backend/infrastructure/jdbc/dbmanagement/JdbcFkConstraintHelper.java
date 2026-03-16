/*
 * File: JdbcFkConstraintHelper.java
 * Purpose: Helper to disable and re-enable foreign key constraints
 * during database restore operations. Uses PostgreSQL session
 * replication role to bypass trigger-based FK checks.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

class JdbcFkConstraintHelper {
  private final Connection conn;

  JdbcFkConstraintHelper(Connection conn) {
    this.conn = conn;
  }

  void disableForeignKeys() throws SQLException {
    try (Statement stmt = conn.createStatement()) {
      // i18n-ignore: JPQL
      stmt.execute(
          "SET session_replication_role = 'replica'");
    }
  }

  void enableForeignKeys() throws SQLException {
    try (Statement stmt = conn.createStatement()) {
      // i18n-ignore: JPQL
      stmt.execute(
          "SET session_replication_role = 'origin'");
    }
  }
}
