/*
 * File: DbManagementComposition.java
 * Purpose: Spring configuration wiring database management
 * adapters and use cases. Centralizes dependency injection for
 * the db-management feature following composition root pattern.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.dbmanagement;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.dbmanagement.port.*;
import com.poetry.poetry_backend.application.dbmanagement.usecase.*;
import com.poetry.poetry_backend.infrastructure.jdbc.dbmanagement.*;

@Configuration
public class DbManagementComposition {

  @Bean
  JdbcTableListAdapter jdbcTableListAdapter(
      DataSource ds) {
    return new JdbcTableListAdapter(ds);
  }

  @Bean
  ListTablesUseCase listTablesUseCase(
      DbTableListPort port) {
    return new ListTablesUseCase(port);
  }

  @Bean
  JdbcExcelExportAdapter jdbcExcelExportAdapter(
      DataSource ds) {
    return new JdbcExcelExportAdapter(ds);
  }

  @Bean
  ExportExcelUseCase exportExcelUseCase(
      DbExcelExportPort port) {
    return new ExportExcelUseCase(port);
  }

  @Bean
  JdbcSqlBackupAdapter jdbcSqlBackupAdapter(
      DataSource ds) {
    return new JdbcSqlBackupAdapter(ds);
  }

  @Bean
  BackupDatabaseUseCase backupDatabaseUseCase(
      DbSqlBackupPort port) {
    return new BackupDatabaseUseCase(port);
  }

  @Bean
  JdbcSqlRestoreAdapter jdbcSqlRestoreAdapter(
      DataSource ds) {
    return new JdbcSqlRestoreAdapter(ds);
  }

  @Bean
  RestoreDatabaseUseCase restoreDatabaseUseCase(
      DbSqlRestorePort port) {
    return new RestoreDatabaseUseCase(port);
  }
}
