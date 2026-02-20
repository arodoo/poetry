/*
 * File: UserDemographicsController.java
 * Purpose: Exposes GET and PUT endpoints for user demographics under
 * /api/v1/users/{userId}/demographics. PUT uses upsert semantics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.userdemographics;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.userdemographics.usecase.GetUserDemographicsUseCase;
import com.poetry.poetry_backend.application.userdemographics.usecase.UpsertUserDemographicsUseCase;
import com.poetry.poetry_backend.interfaces.v1.userdemographics.dto.UserDemographicsRequest;
import com.poetry.poetry_backend.interfaces.v1.userdemographics.dto.UserDemographicsResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "user-demographics", description = "User demographics management")
@RestController
@RequestMapping("/api/v1/users/{userId}/demographics")
public class UserDemographicsController {
  private final GetUserDemographicsUseCase getUseCase;
  private final UpsertUserDemographicsUseCase upsertUseCase;

  public UserDemographicsController(
      GetUserDemographicsUseCase getUseCase,
      UpsertUserDemographicsUseCase upsertUseCase) {
    this.getUseCase = getUseCase;
    this.upsertUseCase = upsertUseCase;
  }

  @Operation(operationId = "getUserDemographics",
      summary = "Get demographics for a user")
  @PreAuthorize("hasAuthority('admin')")
  @GetMapping
  public ResponseEntity<UserDemographicsResponse> get(
      @PathVariable Long userId) {
    return getUseCase.execute(userId)
        .map(d -> ResponseEntity.ok(UserDemographicsResponse.fromDomain(d)))
        .orElse(ResponseEntity.notFound().build());
  }

  @Operation(operationId = "upsertUserDemographics",
      summary = "Create or update demographics for a user")
  @PreAuthorize("hasAuthority('admin')")
  @PutMapping
  public ResponseEntity<UserDemographicsResponse> upsert(
      @PathVariable Long userId,
      @RequestBody UserDemographicsRequest r) {
    var d = upsertUseCase.execute(
        userId, r.birthDate(), r.gender(), r.phone());
    return ResponseEntity.ok(UserDemographicsResponse.fromDomain(d));
  }
}
