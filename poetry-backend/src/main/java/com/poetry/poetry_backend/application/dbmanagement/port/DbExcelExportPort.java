/*
 * File: DbExcelExportPort.java
 * Purpose: Port for exporting database tables to Excel format.
 * Accepts a list of table names and produces an xlsx byte array
 * for download by the interface layer.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.port;

import java.util.List;

public interface DbExcelExportPort {
  byte[] exportExcel(List<String> tables);
}
