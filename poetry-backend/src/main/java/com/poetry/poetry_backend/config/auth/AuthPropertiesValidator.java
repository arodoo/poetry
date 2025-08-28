/*
 * File: AuthPropertiesValidator.java
 * Purpose: Move complex runtime validation out of the POJO so the
 * properties class stays small and focused. Performs the same checks
 * that used to live in AuthProperties.@PostConstruct.
 * All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.auth;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class AuthPropertiesValidator {
  private final AuthProperties props;

  public AuthPropertiesValidator(AuthProperties props) {
    this.props = props;
  }

  @PostConstruct
  void validate() {
    String s = props.getSecretKey() == null ? "" : props.getSecretKey();
    int classes = 0;
    if (s.matches(".*[a-z].*"))
      classes++;
    if (s.matches(".*[A-Z].*"))
      classes++;
    if (s.matches(".*[0-9].*"))
      classes++;
    if (s.matches(".*[^a-zA-Z0-9].*"))
      classes++;
    if (classes < 3) {
      throw new IllegalStateException("cfg.auth.secret.complexity");
    }
    if (props.getPreviousSecretKey() != null &&
        props.getPreviousSecretKey().equals(props.getSecretKey())) {
      throw new IllegalStateException("cfg.auth.secret.rotation.different");
    }
    if (props.getRotationOverlapSeconds() > 0 &&
        props.getPreviousSecretKey() == null) {
      throw new IllegalStateException("cfg.auth.secret.rotation.previous-required");
    }
  }
}
