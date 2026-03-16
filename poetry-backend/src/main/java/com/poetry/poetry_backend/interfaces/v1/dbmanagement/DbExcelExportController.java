/*
 * File: DbExcelExportController.java
 * Purpose: REST controller for exporting database tables to Excel.
 * Accepts optional table selection via query parameter and returns
 * an xlsx file as a binary download with proper headers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

import java.util.List;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.dbmanagement.usecase.ExportExcelUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "db-management")
@RestController
@RequestMapping("/api/v1/db-management")
public class DbExcelExportController {
  private final ExportExcelUseCase useCase;

  public DbExcelExportController(
      ExportExcelUseCase useCase) {
    this.useCase = useCase;
  }

  @Operation(
      operationId = "exportDbExcel",
      summary = "Export tables to Excel")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/export/excel")
  public ResponseEntity<byte[]> export(
      @RequestParam(defaultValue = "all")
      List<String> tables) {
    byte[] bytes = useCase.execute(tables);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentDisposition(
        ContentDisposition.attachment()
            .filename("poetry-export.xlsx")
            .build());
    headers.setContentType(
        MediaType.APPLICATION_OCTET_STREAM);
    return new ResponseEntity<>(
        bytes, headers, HttpStatus.OK);
  }
}
