/*
 * File: UsersUpdateController.java
 * Purpose: Provide the update user endpoint with method security.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.application.user.usecase.GetUserByIdUseCase;
import com.poetry.poetry_backend.application.user.usecase.UpdateUserUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "users", description = "User management")
@RestController
@RequestMapping("/api/v1/users")
public class UsersUpdateController {
  private final UpdateUserUseCase update;
  private final GetUserByIdUseCase getUser;
  private final ETagPort etagPort;
  private final ObjectMapper mapper;
  
  public UsersUpdateController(
      UpdateUserUseCase update,
      GetUserByIdUseCase getUser,
      ETagPort etagPort,
      ObjectMapper mapper
  ) {
    this.update = update;
    this.getUser = getUser;
    this.etagPort = etagPort;
    this.mapper = mapper;
  }

  @Operation(
      operationId = "updateUser",
      summary = "Update user",
      description = "Update user with optimistic locking via If-Match")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Successfully updated"),
    @ApiResponse(responseCode = "400", description = "Invalid request"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden"),
    @ApiResponse(responseCode = "404", description = "Not found"),
    @ApiResponse(responseCode = "409", description = "Version conflict")
  })
  @PreAuthorize("hasAuthority('admin')")
  @PutMapping("/{id}")
  public ResponseEntity<UserResponse> update(
      @PathVariable Long id,
      @RequestHeader("If-Match") String ifMatch,
      @RequestBody UserUpdateRequest r) throws Exception {
    // Get current user to extract version - IfMatchFilter already validated ETag
    var currentUser = getUser.execute(id);
    long version = currentUser.version();
    
    var u = update.execute(
        id, version, r.firstName(), r.lastName(), r.email(),
        r.locale(), r.roles(), r.status());
    
    var response = UserDto.toResponse(u);
    String etag = etagPort.compute(mapper.writeValueAsString(response));
    return ResponseEntity.ok().eTag(etag).body(response);
  }
}
