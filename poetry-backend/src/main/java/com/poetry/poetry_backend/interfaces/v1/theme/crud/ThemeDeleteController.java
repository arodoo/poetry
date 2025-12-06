/*
 * File: ThemeDeleteController.java
 * Purpose: REST endpoint to delete themes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.theme.usecase.crud.DeleteThemeUseCase;

@RestController
@RequestMapping("/api/v1/themes")
public class ThemeDeleteController {
  private final DeleteThemeUseCase deleteUseCase;

  public ThemeDeleteController(DeleteThemeUseCase deleteUseCase) {
    this.deleteUseCase = deleteUseCase;
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    deleteUseCase.execute(id);
    return ResponseEntity.noContent().build();
  }
}
