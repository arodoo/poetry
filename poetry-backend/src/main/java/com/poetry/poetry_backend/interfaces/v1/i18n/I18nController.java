/*
 * File: I18nController.java
 * Purpose: REST controller exposing supported locales listing and
 * message resolution (optional) for clients. Keeps logic in use cases.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.i18n;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.i18n.usecase.GetSupportedLocalesUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;
import com.poetry.poetry_backend.interfaces.v1.i18n.I18nDtos.LocalesResponse;

@RestController
@RequestMapping("/v1/i18n")
public class I18nController {
  private final GetSupportedLocalesUseCase getLocales;
  private final ResolveMessageUseCase resolve;

  public I18nController(GetSupportedLocalesUseCase getLocales, ResolveMessageUseCase resolve) {
    this.getLocales = getLocales;
    this.resolve = resolve;
  }

  @GetMapping("/locales")
  public ResponseEntity<LocalesResponse> locales() {
    return ResponseEntity.ok(new LocalesResponse(getLocales.execute()));
  }

  @GetMapping("/messages/{key}")
  public ResponseEntity<String> message(
      @PathVariable String key,
      @RequestParam(required = false) String locale) {
    return ResponseEntity.ok(resolve.execute(key, locale));
  }
}
