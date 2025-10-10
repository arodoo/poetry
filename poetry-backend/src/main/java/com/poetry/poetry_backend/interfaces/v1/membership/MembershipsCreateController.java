/*
 * File: MembershipsCreateController.java
 * Purpose: REST controller for membership creation endpoint following
 * clean architecture and blueprint conventions.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import static com.poetry.poetry_backend.interfaces.v1.membership.MembershipDtos.*;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.membership.usecase.CreateMembershipUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/memberships")
@Tag(name = "memberships", description = "Membership management")
public class MembershipsCreateController {
  private final CreateMembershipUseCase create;

  public MembershipsCreateController(CreateMembershipUseCase create) {
    this.create = create;
  }

  @Operation(
      operationId = "createMembership",
      summary = "Create membership",
      description = "Create new membership with validation")
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MembershipResponse createMembership(
      @RequestBody MembershipCreateRequest request) {
    var membership = create.execute(
        request.userId(),
        request.subscriptionId(),
        request.sellerCode(),
        request.zoneIds(),
        request.allZones(),
        request.status());
    return MembershipDtos.toResponse(membership);
  }
}
