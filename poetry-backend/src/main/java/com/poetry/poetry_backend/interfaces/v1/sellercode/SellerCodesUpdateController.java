/*
 * File: SellerCodesUpdateController.java
 * Purpose: Provide update seller code endpoint with method security ETag
 * validation and version checks delegating to use case for business logic
 * while keeping controller focused on HTTP concerns.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.sellercode;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.sellercode.usecase.UpdateSellerCodeUseCase;

@RestController
@RequestMapping("/api/v1/seller-codes")
public class SellerCodesUpdateController {
  private final UpdateSellerCodeUseCase update;

  public SellerCodesUpdateController(UpdateSellerCodeUseCase update) {
    this.update = update;
  }

  @PreAuthorize("hasAuthority('admin')")
  @PutMapping("/{id}")
  public ResponseEntity<SellerCodeDtos.SellerCodeResponse> update(
      @PathVariable Long id,
      @RequestHeader(value = "If-Match", required = false) String ifMatch,
      @RequestBody SellerCodeDtos.SellerCodeUpdateRequest r) {
    long version = ifMatch == null ? 0L : Long.parseLong(ifMatch.replace("\"", ""));
    var sc = update.execute(id, version, r.code(), r.organizationId(), r.status());
    return ResponseEntity.ok().body(SellerCodeDtos.toResponse(sc));
  }
}
