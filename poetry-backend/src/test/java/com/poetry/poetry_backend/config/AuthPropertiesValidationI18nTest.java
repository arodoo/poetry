/*
 * File: AuthPropertiesValidationI18nTest.java
 * Purpose: Validate Bean Validation on AuthProperties produces localized
 * constraint violation messages (secretKey min length) for default Spanish
 * and explicit English locale. Ensures Spanish is default when no locale
 * specified and English resolved when requested. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Locale;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.test.context.TestPropertySource;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

@SpringBootTest
@TestPropertySource(properties = {
    "app.default-locale=es",
    "app.supported-locales=es,en"
})
class AuthPropertiesValidationI18nTest {
  @Autowired private Validator validator; // backed by LocalValidatorFactoryBean with MessageSource
  private AuthProperties props;
  private Locale original;

  @BeforeEach
  void setUp() {
    original = LocaleContextHolder.getLocale();
    props = new AuthProperties();
    props.setSecretKey("short-secret"); // intentionally too short (<32)
  }

  @AfterEach
  void tearDown() { LocaleContextHolder.setLocale(original); }

  @Test
  void defaultSpanishMessage() {
    // Simulate default locale (Spanish configured as app.default-locale)
    LocaleContextHolder.setLocale(Locale.forLanguageTag("es"));
    var violations = validator.validate(props);
    String msg = singleMessage(violations);
    assertThat(msg).contains("La clave secreta").contains("32");
  }

  @Test
  void englishMessageWhenLocaleSetToEnglish() {
    LocaleContextHolder.setLocale(Locale.forLanguageTag("en"));
    var violations = validator.validate(props);
    String msg = singleMessage(violations);
    assertThat(msg).contains("Secret key").contains("32");
  }

  private String singleMessage(java.util.Set<ConstraintViolation<AuthProperties>> v) {
    assertThat(v).hasSize(1);
    return v.iterator().next().getMessage();
  }
}
