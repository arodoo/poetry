/*
 * File: JdbcSqlBackupAdapter.java
 * Purpose: JDBC adapter implementing DbSqlBackupPort. Generates
 * a full SQL dump with schema DDL and INSERT statements for all
 * tables, writing to a byte array for download.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.sql.*;
import java.util.List;

import javax.sql.DataSource;

import com.poetry.poetry_backend.application.dbmanagement.port.DbSqlBackupPort;

public class JdbcSqlBackupAdapter
    implements DbSqlBackupPort {
  private final DataSource dataSource;

  public JdbcSqlBackupAdapter(DataSource ds) {
    this.dataSource = ds;
  }

  @Override
  public byte[] generateBackup() {
    ByteArrayOutputStream out =
        new ByteArrayOutputStream();
    try (Connection conn = dataSource.getConnection();
         PrintWriter w = new PrintWriter(out)) {
      writeHeader(w);
      List<String> tables =
          new JdbcTableNamesFetcher(conn).fetch();
      writeSchema(conn, w, tables);
      writeData(conn, w, tables);
      w.flush();
    } catch (Exception e) {
      throw new RuntimeException( // i18n-ignore: internal
          "SQL backup failed", e);
    }
    return out.toByteArray();
  }

  private void writeHeader(PrintWriter w) {
    // i18n-ignore: SQL comment
    w.println("-- Poetry Database Full Backup");
    w.println("-- Generated: "
        + java.time.Instant.now());
    w.println();
  }

  private void writeSchema(
      Connection c, PrintWriter w, List<String> t)
      throws SQLException {
    for (String table : t) {
      new JdbcBackupSchemaWriter(c, w, table).write();
    }
  }

  private void writeData(
      Connection c, PrintWriter w, List<String> t)
      throws SQLException {
    w.println("-- Data");
    for (String table : t) {
      new JdbcBackupDataWriter(c, w, table).write();
    }
  }
}
