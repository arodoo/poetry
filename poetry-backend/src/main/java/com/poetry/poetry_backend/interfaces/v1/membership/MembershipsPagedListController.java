/*
 * File: MembershipsPagedListController.java
 * Purpose: REST controller for paginated membership listing with search
 * support following clean architecture and blueprint conventions.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.membership.usecase.GetMembershipsPageUseCase;
import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.interfaces.v1.shared.PageResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/memberships")
@Tag(name = "memberships", description = "Membership management")
public class MembershipsPagedListController {
  private final GetMembershipsPageUseCase getPage;

  public MembershipsPagedListController(
      GetMembershipsPageUseCase getPage) {
    this.getPage = getPage;
  }

  @Operation(
      operationId = "listMembershipsPaged",
      summary = "List memberships (paged)",
      description = "Retrieve memberships with pagination")
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping("/paged")
  public ResponseEntity<PageResponseDto<MembershipDtos.MembershipResponse>>
      paged(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "20") int size,
          @RequestParam(required = false) String search) {
    PageResult<Membership> result = getPage.execute(page, size, search);
    PageResponseDto<MembershipDtos.MembershipResponse> response =
        PageResponseDto.from(result, MembershipDtos::toResponse);
    return ResponseEntity.ok(response);
  }
}
