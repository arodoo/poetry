/*
 * File: UITokensController.java
 * Purpose: Controller for UI tokens endpoint, providing themes,
 * fonts and customization options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.theme.usecase.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;


@RestController
@RequestMapping("/api/v1")
@Validated
public class UITokensController {
  private final UITokensDataProvider provider;
  private final TokensFingerprintBuilder fingerprintBuilder;
  private final SaveSystemSelectionUseCase saveSelectionUseCase;

  public UITokensController(UITokensDataProvider provider,
      TokensFingerprintBuilder fingerprintBuilder,
      SaveSystemSelectionUseCase saveSelectionUseCase) {
    this.provider = provider;
    this.fingerprintBuilder = fingerprintBuilder;
    this.saveSelectionUseCase = saveSelectionUseCase;
  }

  @GetMapping("/tokens")
  public ResponseEntity<UITokensDto> getTokens(
      @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch) {
    UITokensDto dto = provider.getTokens();
  String raw = fingerprintBuilder.build(dto);
  // Normalize fingerprint to a plain hash without quotes/weak prefix; Spring will quote it.
  String etag = raw.replace("\"", "").replace("W/", "");
    if (ifNoneMatch != null) {
      String normReq = ifNoneMatch.replace("\"", "");
      String normEtag = etag.replace("\"", "");
      if (normReq.equals(normEtag)) {
  return ResponseEntity.status(304).eTag(etag).build();
      }
    }
    return ResponseEntity.ok().eTag(etag).body(dto);
  }

  @PutMapping("/tokens/selection")
  public ResponseEntity<Void> updateSelection(@RequestBody @Validated UpdateSelectionRequest body) {
    // Basic construction, validation of non-empty handled by record constructor & annotations
    UiCustomizationSelection sel = new UiCustomizationSelection(
        body.theme(), body.font(), body.fontSize(), body.spacing(), body.radius(), body.shadow());
    saveSelectionUseCase.execute(sel);
    return ResponseEntity.noContent().build();
  }
}
