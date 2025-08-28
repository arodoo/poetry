/*
 * File: LocalePreferenceController.java
 * Purpose: REST endpoints for reading and updating the authenticated
 * user's locale preference. Integrates with application service and
 * enforces whitelist validation. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.locale;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.locale.LocalePreferenceService;
import com.poetry.poetry_backend.application.locale.SetUserLocaleCommand;

record UpdateLocalePreferenceRequest(String locale) { }
record LocalePreferenceResponse(String locale) { }

@RestController
@RequestMapping("/v1/me/locale")
public class LocalePreferenceController {
  private final LocalePreferenceService service;

  public LocalePreferenceController(LocalePreferenceService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<LocalePreferenceResponse> get(@RequestHeader("X-User-Id") String userId) {
    String locale = service.resolveLocaleForUser(userId, null);
    return ResponseEntity.ok(new LocalePreferenceResponse(locale));
  }

  @PutMapping
  public ResponseEntity<Void> put(@RequestBody UpdateLocalePreferenceRequest body,
      @RequestHeader("X-User-Id") String userId) {
    service.set(new SetUserLocaleCommand(userId, body.locale()));
    return ResponseEntity.noContent().build();
  }
}
