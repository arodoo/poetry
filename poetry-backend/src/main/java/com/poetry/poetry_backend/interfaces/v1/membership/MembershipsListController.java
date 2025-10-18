/*
 * File: MembershipsListController.java
 * Purpose: REST controller for listing all active memberships following
 * clean architecture patterns and DDD principles.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import static com.poetry.poetry_backend.interfaces.v1.membership.MembershipDto.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.membership.usecase.GetAllMembershipsUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/memberships")
@Tag(name = "memberships", description = "Membership management")
public class MembershipsListController {
  private final GetAllMembershipsUseCase getAll;

  public MembershipsListController(
      GetAllMembershipsUseCase getAll) {
    this.getAll = getAll;
  }

  @Operation(
      operationId = "listMemberships",
      summary = "List all memberships",
      description = "Retrieve all active memberships")
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping
  public List<MembershipResponse> list() {
    return getAll.execute().stream()
        .map(MembershipDto::toResponse)
        .toList();
  }
}
