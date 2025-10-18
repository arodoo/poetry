/*
 * File: SellerCodesListController.java
 * Purpose: Provide list seller codes endpoint with method security delegating
 * to list use case and mapping to response DTOs. One responsibility per file
 * enforces our line limit policy and improves maintainability.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.sellercode;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.sellercode.usecase.GetAllSellerCodesUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "seller-codes", description = "Seller code management")
@RestController
@RequestMapping("/api/v1/seller-codes")
public class SellerCodesListController {
  private final GetAllSellerCodesUseCase getAll;

  public SellerCodesListController(GetAllSellerCodesUseCase getAll) {
    this.getAll = getAll;
  }

  @Operation(
      operationId = "listSellerCodes",
      summary = "List all seller codes",
      description = "Retrieve all seller codes with ETag for caching")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Seller codes list"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
      })
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping
  public ResponseEntity<List<SellerCodeDto.SellerCodeResponse>> all() {
    var codes = getAll.execute();
  var out = codes.stream().map(SellerCodeDto::toResponse).toList();
    String etag =
        String.valueOf(
            codes.stream().mapToLong(sc -> sc.version()).sum() + codes.size());
    return ResponseEntity.ok().eTag(etag).body(out);
  }
}
