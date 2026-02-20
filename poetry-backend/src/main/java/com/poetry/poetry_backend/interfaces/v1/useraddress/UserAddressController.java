/*
 * File: UserAddressController.java
 * Purpose: Exposes GET and PUT endpoints for user address under
 * /api/v1/users/{userId}/address. PUT uses upsert semantics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.useraddress;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.useraddress.usecase.GetUserAddressUseCase;
import com.poetry.poetry_backend.application.useraddress.usecase.UpsertUserAddressUseCase;
import com.poetry.poetry_backend.interfaces.v1.useraddress.dto.UserAddressRequest;
import com.poetry.poetry_backend.interfaces.v1.useraddress.dto.UserAddressResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "user-address", description = "User address management")
@RestController
@RequestMapping("/api/v1/users/{userId}/address")
public class UserAddressController {
  private final GetUserAddressUseCase getUseCase;
  private final UpsertUserAddressUseCase upsertUseCase;

  public UserAddressController(
      GetUserAddressUseCase getUseCase,
      UpsertUserAddressUseCase upsertUseCase) {
    this.getUseCase = getUseCase;
    this.upsertUseCase = upsertUseCase;
  }

  @Operation(operationId = "getUserAddress",
      summary = "Get address for a user")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping
  public ResponseEntity<UserAddressResponse> get(
      @PathVariable Long userId) {
    return getUseCase.execute(userId)
        .map(a -> ResponseEntity.ok(UserAddressResponse.fromDomain(a)))
        .orElse(ResponseEntity.notFound().build());
  }

  @Operation(operationId = "upsertUserAddress",
      summary = "Create or update address for a user")
  @PreAuthorize("hasAuthority('admin')")
  @PutMapping
  public ResponseEntity<UserAddressResponse> upsert(
      @PathVariable Long userId,
      @RequestBody UserAddressRequest r) {
    var a = upsertUseCase.execute(
        userId,
        r.line1(), r.line2(),
        r.city(), r.state(),
        r.zip(), r.country());
    return ResponseEntity.ok(UserAddressResponse.fromDomain(a));
  }
}
