/*
 * File: JdbcExcelSheetWriter.java
 * Purpose: Writes a single Excel sheet for one database table.
 * Creates a header row from column names and data rows from
 * all records, handling various SQL types appropriately.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.sql.*;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

class JdbcExcelSheetWriter {
  private final Connection conn;
  private final XSSFWorkbook workbook;
  private final String tableName;

  JdbcExcelSheetWriter(
      Connection c, XSSFWorkbook wb, String t) {
    this.conn = c;
    this.workbook = wb;
    this.tableName = t;
  }

  void write() throws SQLException {
    Sheet sheet = workbook.createSheet(tableName);
    // i18n-ignore: JPQL
    String sql = "SELECT * FROM \"" + tableName + "\"";
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
      ResultSetMetaData meta = rs.getMetaData();
      int cols = meta.getColumnCount();
      writeHeader(sheet, meta, cols);
      writeRows(sheet, rs, cols);
    }
  }

  private void writeHeader(
      Sheet s, ResultSetMetaData m, int cols)
      throws SQLException {
    Row row = s.createRow(0);
    for (int i = 1; i <= cols; i++) {
      row.createCell(i - 1)
          .setCellValue(m.getColumnName(i));
    }
  }

  private void writeRows(
      Sheet s, ResultSet rs, int cols)
      throws SQLException {
    int rowIdx = 1;
    while (rs.next()) {
      Row row = s.createRow(rowIdx++);
      for (int i = 1; i <= cols; i++) {
        setCellValue(row, i - 1, rs, i);
      }
    }
  }

  private static final int MAX_CELL = 32_767;

  private void setCellValue(
      Row row, int cell, ResultSet rs, int col)
      throws SQLException {
    Object val = rs.getObject(col);
    if (val == null) {
      row.createCell(cell).setCellValue("");
    } else if (val instanceof Number n) {
      row.createCell(cell)
          .setCellValue(n.doubleValue());
    } else {
      String s = val.toString();
      String safe = s.length() > MAX_CELL
          ? s.substring(0, MAX_CELL) : s;
      row.createCell(cell).setCellValue(safe);
    }
  }
}
