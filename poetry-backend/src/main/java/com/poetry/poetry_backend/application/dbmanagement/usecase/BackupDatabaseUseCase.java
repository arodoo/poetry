/*
 * File: BackupDatabaseUseCase.java
 * Purpose: Generate a full SQL backup of the database including
 * schema DDL and data INSERT statements. Delegates to the SQL
 * backup port for byte array generation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.usecase;

import com.poetry.poetry_backend.application.dbmanagement.port.DbSqlBackupPort;

public class BackupDatabaseUseCase {
  private final DbSqlBackupPort port;

  public BackupDatabaseUseCase(DbSqlBackupPort port) {
    this.port = port;
  }

  public byte[] execute() {
    return port.generateBackup();
  }
}
