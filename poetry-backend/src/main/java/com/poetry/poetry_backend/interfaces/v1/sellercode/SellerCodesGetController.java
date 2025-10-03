/*
 * File: SellerCodesGetController.java
 * Purpose: Provide get seller code by id endpoint with method security keeping
 * controller small and focused per endpoint with ETag support for caching and
 * optimistic concurrency control.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.sellercode;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.application.sellercode.usecase.GetSellerCodeByIdUseCase;

@RestController
@RequestMapping("/api/v1/seller-codes")
public class SellerCodesGetController {
  private final GetSellerCodeByIdUseCase getById;
  private final ETagPort etagPort;
  private final ObjectMapper mapper;

  public SellerCodesGetController(
      GetSellerCodeByIdUseCase getById, ETagPort etagPort, ObjectMapper mapper) {
    this.getById = getById;
    this.etagPort = etagPort;
    this.mapper = mapper;
  }

  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping("/{id}")
  public ResponseEntity<SellerCodeDtos.SellerCodeResponse> byId(
      @PathVariable Long id) throws Exception {
    var sc = getById.execute(id);
    var response = SellerCodeDtos.toResponse(sc);
    String etag = etagPort.compute(mapper.writeValueAsString(response));
    return ResponseEntity.ok().eTag(etag).body(response);
  }
}
