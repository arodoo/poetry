/*
 * File: AdminEchoController.java
 * Purpose: Real admin echo endpoint for API v1. Validates input and
 * returns the echoed message. This supports the frontend admin echo
 * query and removes placeholder semantics.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.admin.usecase.AdminEchoUseCase;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RestController
@RequestMapping("/api/v1/admin")
@Validated
public class AdminEchoController {
  private final AdminEchoUseCase echo;
  public AdminEchoController(AdminEchoUseCase echo) { this.echo = echo; }

  public record EchoRequest(@NotBlank @Size(min=1, max=512) String message) {}
  public record EchoResponse(String message) {}

  @PostMapping("/echo")
  public ResponseEntity<EchoResponse> echo(@Valid @RequestBody EchoRequest req) {
    String msg = echo.execute(req.message());
    return ResponseEntity.ok(new EchoResponse(msg));
  }
}
