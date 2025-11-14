/*
 * File: PublicLandingController.java
 * Purpose: Public landing page endpoint returning marketing content
 * and feature highlights without requiring authentication.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.publics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public")
public class PublicLandingController {

  public record FeatureDto(String titleKey, String descriptionKey) {}

  public record PublicLandingResponse(
      String heroTitleKey,
      String heroBodyKey,
      String loginCtaKey,
      String registerCtaKey,
      java.util.List<FeatureDto> features) {}

  @GetMapping("/landing")
  public ResponseEntity<PublicLandingResponse> getLanding() {
    var features = java.util.List.of(
        new FeatureDto("ui.public.home.features.creative", 
            "ui.public.home.features.creative.desc"),
        new FeatureDto("ui.public.home.features.collaborate", 
            "ui.public.home.features.collaborate.desc"),
        new FeatureDto("ui.public.home.features.publish", 
            "ui.public.home.features.publish.desc"));
    var response = new PublicLandingResponse(
        "ui.public.home.hero.title",
        "ui.public.home.hero.body",
        "ui.public.home.cta.login",
        "ui.public.home.cta.register",
        features);
    return ResponseEntity.ok(response);
  }
}
