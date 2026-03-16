/*
 * File: DbManagementDtos.java
 * Purpose: Response DTOs for database management endpoints.
 * Contains table info and restore result records that decouple
 * internal domain models from the API contract.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import com.poetry.poetry_backend.application.dbmanagement.model.RestoreResult;
import com.poetry.poetry_backend.domain.dbmanagement.model.TableInfo;

import io.swagger.v3.oas.annotations.media.Schema;

public final class DbManagementDtos {

  private DbManagementDtos() {
  }

  @Schema(description = "Table metadata")
  public record TableInfoResponse(
      @Schema(example = "users") String name,
      @Schema(example = "42") long rowCount) {

    public static TableInfoResponse from(TableInfo t) {
      return new TableInfoResponse(
          t.name(), t.rowCount());
    }
  }

  @Schema(description = "Restore operation result")
  public record RestoreResponse(
      @Schema(example = "30") int tablesRestored,
      @Schema(example = "success") String status) {

    public static RestoreResponse from(RestoreResult r) {
      return new RestoreResponse(
          r.tablesRestored(), r.status());
    }
  }
}
