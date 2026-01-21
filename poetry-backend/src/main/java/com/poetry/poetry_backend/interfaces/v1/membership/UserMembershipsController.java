/*
 * File: UserMembershipsController.java
 * Purpose: REST controller for listing user memberships filtered by status.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.membership;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.membership.dto.MembershipDetail;
import com.poetry.poetry_backend.application.membership.usecase.GetMembershipsByStatusUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/user-memberships")
@Tag(name = "user-memberships", description = "User Membership management")
public class UserMembershipsController {
  private final GetMembershipsByStatusUseCase getByStatus;

  public UserMembershipsController(GetMembershipsByStatusUseCase getByStatus) {
    this.getByStatus = getByStatus;
  }

  @Operation(
      operationId = "listUserMemberships",
      summary = "List user memberships by status",
      description = "Retrieve user memberships filtered by status (ACTIVE, EXPIRING, EXPIRED)")
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping
  public Page<MembershipDetail> list(
      @RequestParam(defaultValue = "ACTIVE") String status,
      Pageable pageable) {
    return getByStatus.execute(status, pageable);
  }
}
