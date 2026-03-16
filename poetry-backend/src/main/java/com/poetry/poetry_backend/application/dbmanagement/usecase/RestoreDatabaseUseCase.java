/*
 * File: RestoreDatabaseUseCase.java
 * Purpose: Restore the database from an uploaded SQL backup file.
 * Delegates to the SQL restore port which handles FK constraints,
 * truncation, and statement execution within a transaction.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.usecase;

import java.io.InputStream;

import com.poetry.poetry_backend.application.dbmanagement.model.RestoreResult;
import com.poetry.poetry_backend.application.dbmanagement.port.DbSqlRestorePort;

public class RestoreDatabaseUseCase {
  private final DbSqlRestorePort port;

  public RestoreDatabaseUseCase(DbSqlRestorePort port) {
    this.port = port;
  }

  public RestoreResult execute(InputStream sql) {
    return port.restore(sql);
  }
}
