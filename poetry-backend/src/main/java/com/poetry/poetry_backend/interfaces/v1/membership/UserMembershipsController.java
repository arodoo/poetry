/*
 * File: UserMembershipsController.java
 * Purpose: REST controller for listing user memberships filtered by status.
 * Standardized to use internal PageResponseDto for consistent serialization.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.membership;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.membership.dto.MembershipDetail;
import com.poetry.poetry_backend.application.membership.usecase.GetMembershipsByStatusUseCase;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.interfaces.v1.shared.PageResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("${app.api-base-path}/user-memberships")
@Tag(name = "user-memberships", description = "User Membership management")
public class UserMembershipsController {
  private final GetMembershipsByStatusUseCase getByStatus;

  public UserMembershipsController(GetMembershipsByStatusUseCase getByStatus) {
    this.getByStatus = getByStatus;
  }

  @Operation(operationId = "listUserMemberships", summary = "List user memberships by status", description = "Retrieve user memberships filtered by status (ACTIVE, EXPIRING, EXPIRED)")
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping
  public ResponseEntity<PageResponseDto<MembershipDetail>> list(
      @RequestParam(defaultValue = "ACTIVE") String status,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    Pageable pageable = PageRequest.of(page, size);
    PageResult<MembershipDetail> result = getByStatus.execute(status, pageable);
    return ResponseEntity.ok(PageResponseDto.from(result, d -> d));
  }
}
