/*
 * File: UITokensController.java
 * Purpose: Controller for UI tokens endpoint, providing themes,
 * fonts and customization options for frontend UI library config.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
public class UITokensController {
  private final UITokensDataProvider provider;
  private final TokensFingerprintBuilder fingerprintBuilder;

  public UITokensController(UITokensDataProvider provider,
      TokensFingerprintBuilder fingerprintBuilder) {
    this.provider = provider;
    this.fingerprintBuilder = fingerprintBuilder;
  }

  @GetMapping("/tokens")
  public ResponseEntity<UITokensDto> getTokens(
      @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch) {
    UITokensDto dto = provider.getTokens();
    String etag = fingerprintBuilder.build(dto);
    if (ifNoneMatch != null) {
      String normReq = ifNoneMatch.replace("\"", "");
      String normEtag = etag.replace("\"", "");
      if (normReq.equals(normEtag)) {
        return ResponseEntity.status(304).eTag(etag).build();
      }
    }
    return ResponseEntity.ok().eTag(etag).body(dto);
  }
}
