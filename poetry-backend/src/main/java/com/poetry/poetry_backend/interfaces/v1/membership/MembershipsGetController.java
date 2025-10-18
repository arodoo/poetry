/*
 * File: MembershipsGetController.java
 * Purpose: REST controller for retrieving single membership by ID with
 * ETag support for caching following clean architecture patterns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.membership;

import static com.poetry.poetry_backend.interfaces.v1.membership.MembershipDto.*;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.application.membership.usecase.GetMembershipByIdUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/memberships")
@Tag(name = "memberships", description = "Membership management")
public class MembershipsGetController {
  private final GetMembershipByIdUseCase getById;
  private final ETagPort etagPort;
  private final ObjectMapper mapper;

  public MembershipsGetController(
      GetMembershipByIdUseCase getById,
      ETagPort etagPort,
      ObjectMapper mapper) {
    this.getById = getById;
    this.etagPort = etagPort;
    this.mapper = mapper;
  }

  @Operation(
      operationId = "getMembershipById",
      summary = "Get membership by ID",
      description = "Retrieve single membership with ETag")
  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping("/{id}")
  public ResponseEntity<MembershipResponse> byId(@PathVariable Long id)
      throws Exception {
    var membership = getById.execute(id);
    var response = MembershipDto.toResponse(membership);
    String etag =
        etagPort.compute(mapper.writeValueAsString(response));
    return ResponseEntity.ok().eTag(etag).body(response);
  }
}
