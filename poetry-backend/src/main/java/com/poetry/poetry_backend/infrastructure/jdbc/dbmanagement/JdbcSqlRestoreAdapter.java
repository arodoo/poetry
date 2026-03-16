/*
 * File: JdbcSqlRestoreAdapter.java
 * Purpose: JDBC adapter implementing DbSqlRestorePort. Parses the
 * uploaded SQL file and delegates execution to JdbcRestoreExecutor
 * within a single transaction with rollback on failure.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import com.poetry.poetry_backend.application.dbmanagement.model.RestoreResult;
import com.poetry.poetry_backend.application.dbmanagement.port.DbSqlRestorePort;

public class JdbcSqlRestoreAdapter
    implements DbSqlRestorePort {
  private final DataSource dataSource;

  public JdbcSqlRestoreAdapter(DataSource ds) {
    this.dataSource = ds;
  }

  @Override
  public RestoreResult restore(InputStream sql) {
    List<String> stmts =
        new JdbcSqlRestoreParser().parse(sql);
    try (Connection conn =
             dataSource.getConnection()) {
      conn.setAutoCommit(false);
      try {
        RestoreResult result =
            new JdbcRestoreExecutor(conn)
                .execute(stmts);
        return result;
      } catch (Exception e) {
        conn.rollback();
        throw new RuntimeException( // i18n-ignore: internal
            "Restore failed, rolled back", e);
      } finally {
        conn.setAutoCommit(true);
      }
    } catch (SQLException e) {
      throw new RuntimeException( // i18n-ignore: internal
          "Restore connection failed", e);
    }
  }
}
