/*
 * File: UsersGetController.java
 * Purpose: Provide the get user by id endpoint with method security.
 * Keeps controller small and focused per endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.application.user.usecase.GetUserByIdUseCase;

@RestController
@RequestMapping("/api/v1/users")
public class UsersGetController {
  private final GetUserByIdUseCase getById;
  private final ETagPort etagPort;
  private final ObjectMapper mapper;
  
  public UsersGetController(GetUserByIdUseCase getById, ETagPort etagPort, ObjectMapper mapper) { 
    this.getById = getById; 
    this.etagPort = etagPort;
    this.mapper = mapper;
  }

  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping("/{id}")
  public ResponseEntity<UserDtos.UserResponse> byId(@PathVariable Long id) throws Exception {
    var u = getById.execute(id);
    var response = UserDtos.toResponse(u);
    String etag = etagPort.compute(mapper.writeValueAsString(response));
    return ResponseEntity.ok().eTag(etag).body(response);
  }
}
