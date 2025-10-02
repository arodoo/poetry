/*
 * File: RolesController.java
 * Purpose: Provide available system roles for forms.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.roles;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.domain.auth.model.Role;

@RestController
@RequestMapping("/api/v1/roles")
public class RolesController {

  @PreAuthorize("hasAnyAuthority('admin', 'manager')")
  @GetMapping
  public ResponseEntity<List<RoleDto>> listRoles() {
    List<RoleDto> roles = Arrays.stream(Role.values())
        .map(role -> new RoleDto(role.key(), role.name()))
        .toList();
    return ResponseEntity.ok(roles);
  }

  public record RoleDto(String key, String name) { }
}
