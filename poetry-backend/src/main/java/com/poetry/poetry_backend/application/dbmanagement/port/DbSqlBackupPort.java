/*
 * File: DbSqlBackupPort.java
 * Purpose: Port for generating a full SQL backup of the database.
 * Produces a byte array containing schema DDL and INSERT
 * statements for all tables in PostgreSQL format.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.port;

public interface DbSqlBackupPort {
  byte[] generateBackup();
}
