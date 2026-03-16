/*
 * File: JdbcExcelExportAdapter.java
 * Purpose: JDBC adapter implementing DbExcelExportPort. Generates
 * an xlsx workbook using Apache POI with one sheet per selected
 * table, querying data via JDBC metadata.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.io.ByteArrayOutputStream;
import java.sql.*;
import java.util.List;

import javax.sql.DataSource;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.poetry.poetry_backend.application.dbmanagement.port.DbExcelExportPort;

public class JdbcExcelExportAdapter
    implements DbExcelExportPort {
  private final DataSource dataSource;

  public JdbcExcelExportAdapter(DataSource ds) {
    this.dataSource = ds;
  }

  @Override
  public byte[] exportExcel(List<String> tables) {
    try (Connection conn = dataSource.getConnection();
         XSSFWorkbook wb = new XSSFWorkbook()) {
      List<String> target = resolveTables(
          conn, tables);
      for (String table : target) {
        new JdbcExcelSheetWriter(conn, wb, table)
            .write();
      }
      return toBytes(wb);
    } catch (Exception e) {
      throw new RuntimeException( // i18n-ignore: internal
          "Excel export failed", e);
    }
  }

  private List<String> resolveTables(
      Connection conn, List<String> requested)
      throws SQLException {
    if (requested == null || requested.isEmpty()
        || requested.contains("all")) {
      return new JdbcTableNamesFetcher(conn).fetch();
    }
    return requested;
  }

  private byte[] toBytes(XSSFWorkbook wb)
      throws Exception {
    ByteArrayOutputStream out =
        new ByteArrayOutputStream();
    wb.write(out);
    return out.toByteArray();
  }
}
