/*
 * File: DbTableListPort.java
 * Purpose: Query port for listing database tables with their row
 * counts. Used by the application layer to expose table metadata
 * without coupling to infrastructure details.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.port;

import java.util.List;

import com.poetry.poetry_backend.domain.dbmanagement.model.TableInfo;

public interface DbTableListPort {
  List<TableInfo> listTables();
}
