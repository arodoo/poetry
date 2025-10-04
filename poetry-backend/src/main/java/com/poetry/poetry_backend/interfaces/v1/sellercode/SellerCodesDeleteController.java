/*
 * File: SellerCodesDeleteController.java
 * Purpose: Provide soft delete seller code endpoint with method security and
 * version validation delegating to use case for consistent soft delete
 * semantics across the application layer.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.sellercode;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.sellercode.usecase.DeleteSellerCodeUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "seller-codes", description = "Seller code management")
@RestController
@RequestMapping("/api/v1/seller-codes")
public class SellerCodesDeleteController {
  private final DeleteSellerCodeUseCase delete;

  public SellerCodesDeleteController(DeleteSellerCodeUseCase delete) {
    this.delete = delete;
  }

  @Operation(
      operationId = "deleteSellerCode",
      summary = "Delete seller code",
      description = "Soft delete seller code with optimistic locking")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "204", description = "Successfully deleted"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden"),
        @ApiResponse(responseCode = "404", description = "Not found"),
        @ApiResponse(responseCode = "409", description = "Version conflict")
      })
  @PreAuthorize("hasAuthority('admin')")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(
      @PathVariable Long id,
      @RequestHeader(value = "If-Match", required = false) String ifMatch) {
    long version = ifMatch == null ? 0L : Long.parseLong(ifMatch.replace("\"", ""));
    delete.execute(id, version);
    return ResponseEntity.noContent().build();
  }
}
