/*
 * File: UpdateSelectionRequest.java
 * Purpose: Request DTO for updating UI customization selection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UpdateSelectionRequest(
    @NotBlank(message = "selection.theme.missing")
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", message = "theme.key.invalid")
    String theme,
    @NotBlank(message = "selection.font.missing")
    String font,
    @NotBlank(message = "selection.fontSize.missing")
    String fontSize,
    @NotBlank(message = "selection.spacing.missing")
    String spacing,
    @NotBlank(message = "selection.radius.missing")
    String radius,
    @NotBlank(message = "selection.shadow.missing")
    String shadow) { }
