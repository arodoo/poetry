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

@RestController
@RequestMapping("/api/v1/seller-codes")
public class SellerCodesDeleteController {
  private final DeleteSellerCodeUseCase delete;

  public SellerCodesDeleteController(DeleteSellerCodeUseCase delete) {
    this.delete = delete;
  }

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
