/*
 * File: AuthStatusController.java
 * Purpose: Expose GET /api/v1/auth/status returning authenticated flag.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "auth", description = "Authentication endpoints")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthStatusController {
  @Schema(description = "Authentication status response")
  public record StatusResponse(
      @Schema(description = "Whether user is authenticated", example = "true")
      boolean authenticated) {}

  @Operation(
      operationId = "status",
      summary = "Check authentication status",
      description = "Check if user is currently authenticated")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Status retrieved")
  })
  @GetMapping("/status")
  public ResponseEntity<StatusResponse> status(Principal principal) {
    boolean isAuth = principal != null;
    return ResponseEntity.ok(new StatusResponse(isAuth));
  }
}
