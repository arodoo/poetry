/*
 * File: ListTablesUseCase.java
 * Purpose: Retrieve all database table names with row counts.
 * Delegates to the table list port and returns metadata for
 * display in the database management interface.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.dbmanagement.port.DbTableListPort;
import com.poetry.poetry_backend.domain.dbmanagement.model.TableInfo;

public class ListTablesUseCase {
  private final DbTableListPort port;

  public ListTablesUseCase(DbTableListPort port) {
    this.port = port;
  }

  public List<TableInfo> execute() {
    return port.listTables();
  }
}
