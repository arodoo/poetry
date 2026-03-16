/*
 * File: JdbcSqlRestoreParser.java
 * Purpose: Parses a SQL backup file into individual executable
 * statements. Splits on semicolons while respecting quoted
 * strings to avoid breaking multi-value INSERT statements.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

class JdbcSqlRestoreParser {

  List<String> parse(InputStream input) {
    List<String> statements = new ArrayList<>();
    StringBuilder current = new StringBuilder();
    boolean inQuote = false;
    try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(
            input, StandardCharsets.UTF_8))) {
      int ch;
      while ((ch = reader.read()) != -1) {
        char c = (char) ch;
        if (c == '\'' && !inQuote) {
          inQuote = true;
        } else if (c == '\'' && inQuote) {
          inQuote = false;
        }
        if (c == ';' && !inQuote) {
          addStatement(statements, current);
          current = new StringBuilder();
        } else {
          current.append(c);
        }
      }
      addStatement(statements, current);
    } catch (Exception e) {
      throw new RuntimeException( // i18n-ignore: internal
          "Failed to parse SQL file", e);
    }
    return statements;
  }

  private void addStatement(
      List<String> list, StringBuilder sb) {
    String sql = sb.toString().trim();
    if (!sql.isEmpty() && !sql.startsWith("--")) {
      list.add(sql);
    }
  }
}
