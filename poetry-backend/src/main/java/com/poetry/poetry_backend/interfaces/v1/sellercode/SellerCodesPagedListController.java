/*
 * File: SellerCodesPagedListController.java
 * Purpose: REST endpoint for paginated seller codes retrieval.
 * Provides server-side pagination with query params for page and size.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.sellercode;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.sellercode.usecase.GetSellerCodesPageUseCase;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.interfaces.v1.shared.PageResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/seller-codes")
@Tag(name = "Seller Codes", description = "Seller code management")
public class SellerCodesPagedListController {
  private final GetSellerCodesPageUseCase getPageUseCase;

  public SellerCodesPagedListController(
      GetSellerCodesPageUseCase getPageUseCase) {
    this.getPageUseCase = getPageUseCase;
  }

  @GetMapping("/paged")
  @Operation(summary = "Get paginated seller codes", description = "Retrieve page")
  public PageResponseDto<SellerCodeDtos.SellerCodeResponse> getPaged(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(required = false) String search) {
    PageResult<SellerCode> result = getPageUseCase.execute(page, size, search);
    return PageResponseDto.from(result, SellerCodeDtos::toResponse);
  }
}
