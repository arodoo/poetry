/*
 * File: UITokensController.java
 * Purpose: Controller for UI tokens endpoint, providing themes,
 * fonts and customization options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.i18n.usecase.UpdateI18nUseCase;
import com.poetry.poetry_backend.application.theme.usecase.selection.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.domain.i18n.model.I18n;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;
import com.poetry.poetry_backend.infrastructure.jpa.i18n.I18nJpaRepository;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UpdateSelectionRequest;
import com.poetry.poetry_backend.interfaces.v1.tokens.fingerprint.TokensFingerprintBuilder;
import com.poetry.poetry_backend.interfaces.v1.tokens.provider.UITokensDataProvider;

@RestController
@RequestMapping("/api/v1")
@Validated
public class UITokensController {
  private final UITokensDataProvider provider;
  private final TokensFingerprintBuilder fingerprintBuilder;
  private final SaveSystemSelectionUseCase saveSelectionUseCase;
  private final UpdateI18nUseCase updateI18nUseCase;
  private final I18nJpaRepository i18nRepo;

  public UITokensController(UITokensDataProvider provider,
      TokensFingerprintBuilder fingerprintBuilder,
      SaveSystemSelectionUseCase saveSelectionUseCase,
      UpdateI18nUseCase updateI18nUseCase,
      I18nJpaRepository i18nRepo) {
    this.provider = provider;
    this.fingerprintBuilder = fingerprintBuilder;
    this.saveSelectionUseCase = saveSelectionUseCase;
    this.updateI18nUseCase = updateI18nUseCase;
    this.i18nRepo = i18nRepo;
  }

  @GetMapping("/tokens")
  public ResponseEntity<UITokensDto> getTokens(
      @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch) {
    UITokensDto dto = provider.getTokens();
    String raw = fingerprintBuilder.build(dto);
    // Normalize fingerprint to a plain hash without quotes/weak prefix; Spring will
    // quote it.
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
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Void> updateSelection(@RequestBody @Validated UpdateSelectionRequest body) {
    // Basic construction, validation of non-empty handled by record constructor &
    // annotations
    UiCustomizationSelection sel = new UiCustomizationSelection(
        body.theme(), body.font(), body.fontSize(), body.spacing(), body.radius());
    saveSelectionUseCase.execute(sel);

    // Update global system language in I18nEntity singleton
    i18nRepo.findAll().stream().findFirst().ifPresent(e -> {
      I18n i18n = I18n.of(body.language(), e.getSupportedLocales());
      updateI18nUseCase.execute(e.getId(), i18n);
    });

    return ResponseEntity.noContent().build();
  }
}
