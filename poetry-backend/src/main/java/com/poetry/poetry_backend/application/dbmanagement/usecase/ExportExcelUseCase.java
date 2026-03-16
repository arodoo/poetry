/*
 * File: ExportExcelUseCase.java
 * Purpose: Export selected database tables to Excel format.
 * Delegates to the Excel export port and returns the xlsx
 * byte array for the interface layer to serve as download.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.dbmanagement.port.DbExcelExportPort;

public class ExportExcelUseCase {
  private final DbExcelExportPort port;

  public ExportExcelUseCase(DbExcelExportPort port) {
    this.port = port;
  }

  public byte[] execute(List<String> tables) {
    return port.exportExcel(tables);
  }
}
