/*
 * File: SellerCodesCreateController.java
 * Purpose: Provide create seller code endpoint with method security delegating
 * to use case and mapping request response DTOs ensuring clean separation
 * between interface and application layers.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.sellercode;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.sellercode.usecase.CreateSellerCodeUseCase;

@RestController
@RequestMapping("/api/v1/seller-codes")
public class SellerCodesCreateController {
  private final CreateSellerCodeUseCase create;

  public SellerCodesCreateController(CreateSellerCodeUseCase create) {
    this.create = create;
  }

  @PreAuthorize("hasAuthority('admin')")
  @PostMapping
  public ResponseEntity<SellerCodeDtos.SellerCodeResponse> create(
      @RequestBody SellerCodeDtos.SellerCodeCreateRequest r) {
    var sc = create.execute(r.code(), r.organizationId(), r.userId(), r.status());
    return ResponseEntity.status(201).body(SellerCodeDtos.toResponse(sc));
  }
}
