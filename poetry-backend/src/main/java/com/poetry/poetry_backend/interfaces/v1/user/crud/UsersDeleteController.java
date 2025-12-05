/*
 * File: UsersDeleteController.java
 * Purpose: Provide the delete user endpoint with method security.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.user.usecase.DeleteUserUseCase;
import com.poetry.poetry_backend.application.user.usecase.GetUserByIdUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "users", description = "User management")
@RestController
@RequestMapping("/api/v1/users")
public class UsersDeleteController {
  private final DeleteUserUseCase delete;
  private final GetUserByIdUseCase getUser;
  
  public UsersDeleteController(DeleteUserUseCase delete, GetUserByIdUseCase getUser) { 
    this.delete = delete; 
    this.getUser = getUser;
  }

  @Operation(
      operationId = "deleteUser",
      summary = "Delete user",
      description = "Soft delete user with optimistic locking")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "204", description = "Successfully deleted"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden"),
    @ApiResponse(responseCode = "404", description = "Not found"),
    @ApiResponse(responseCode = "409", description = "Version conflict")
  })
  @PreAuthorize("hasAuthority('admin')")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(
      @PathVariable Long id,
      @RequestHeader("If-Match") String ifMatch) {
    // Get current user to extract version - IfMatchFilter already validated ETag
    var currentUser = getUser.execute(id);
    long version = currentUser.version();
    
    delete.execute(id, version);
    return ResponseEntity.noContent().build();
  }
}
