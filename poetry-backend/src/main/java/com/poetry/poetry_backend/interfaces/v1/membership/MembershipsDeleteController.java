/*
 * File: MembershipsDeleteController.java
 * Purpose: REST controller for membership soft deletion endpoint with
 * version check following clean architecture and blueprint conventions.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.membership.usecase.DeleteMembershipUseCase;
import com.poetry.poetry_backend.application.membership.usecase.GetMembershipByIdUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/memberships")
@Tag(name = "memberships", description = "Membership management")
public class MembershipsDeleteController {
  private final DeleteMembershipUseCase delete;
  private final GetMembershipByIdUseCase getById;

  public MembershipsDeleteController(
      DeleteMembershipUseCase delete,
      GetMembershipByIdUseCase getById) {
    this.delete = delete;
    this.getById = getById;
  }

  @Operation(
      operationId = "deleteMembership",
      summary = "Delete membership",
      description = "Soft delete membership")
  @PreAuthorize("hasAuthority('admin')")
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteMembership(@PathVariable Long id) {
    var current = getById.execute(id);
    delete.execute(id, current.version());
  }
}
