/*
 * File: DbSqlRestorePort.java
 * Purpose: Port for restoring the database from a SQL backup file.
 * Accepts an input stream of SQL statements and executes them
 * within a transaction to restore database state.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.port;

import java.io.InputStream;

import com.poetry.poetry_backend.application.dbmanagement.model.RestoreResult;

public interface DbSqlRestorePort {
  RestoreResult restore(InputStream sql);
}
