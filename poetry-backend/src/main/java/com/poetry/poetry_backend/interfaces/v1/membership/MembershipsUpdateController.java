/*
 * File: MembershipsUpdateController.java
 * Purpose: REST controller for membership update endpoint with ETag
 * validation following clean architecture and blueprint conventions.
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
import com.poetry.poetry_backend.application.membership.usecase.UpdateMembershipUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/memberships")
@Tag(name = "memberships", description = "Membership management")
public class MembershipsUpdateController {
  private final UpdateMembershipUseCase update;
  private final GetMembershipByIdUseCase getById;
  private final ETagPort etagPort;
  private final ObjectMapper mapper;

  public MembershipsUpdateController(
      UpdateMembershipUseCase update,
      GetMembershipByIdUseCase getById,
      ETagPort etagPort,
      ObjectMapper mapper) {
    this.update = update;
    this.getById = getById;
    this.etagPort = etagPort;
    this.mapper = mapper;
  }

  @Operation(
      operationId = "updateMembership",
      summary = "Update membership",
      description = "Update membership with version check")
  @PreAuthorize("hasAuthority('admin')")
  @PutMapping("/{id}")
  public ResponseEntity<MembershipResponse> updateMembership(
      @PathVariable Long id,
      @RequestBody MembershipUpdateRequest request)
      throws Exception {
    var current = getById.execute(id);
    var updated = update.execute(
        id,
        current.version(),
        request.userId(),
        request.subscriptionId(),
        request.sellerCode(),
        request.zoneIds(),
        request.allZones(),
        request.status());
    var response = MembershipDto.toResponse(updated);
    String etag =
        etagPort.compute(mapper.writeValueAsString(response));
    return ResponseEntity.ok().eTag(etag).body(response);
  }
}
