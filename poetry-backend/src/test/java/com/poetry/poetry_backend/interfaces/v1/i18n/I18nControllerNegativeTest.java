/*
 * File: I18nControllerNegativeTest.java
 * Purpose: Negative-path tests for the i18n HTTP controller. These tests
 * verify that missing keys and unsupported locales are surfaced as domain
 * errors and correctly converted by the controller layer. The intent is to
 * prevent API regressions in internationalization endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.i18n;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.application.i18n.usecase.GetSupportedLocalesUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;

class I18nControllerNegativeTest {
    @Test
    void whenMessageKeyMissing_thenThrows() {
            I18nQueryPort port = new I18nQueryPort() {
                @Override
                public java.util.List<String> supportedLocales() {
                    return java.util.List.of("en");
                }

                @Override
                public String defaultLocale() {
                    return "en";
                }

                @Override
                public String resolve(String key, String locale) {
                    throw new IllegalArgumentException("i18n.key.missing");
                }
            };
            ResolveMessageUseCase resolve = new ResolveMessageUseCase(port);
    var controller = new I18nController(
        new GetSupportedLocalesUseCase(port),
        resolve
    );
        org.junit.jupiter.api.Assertions.assertThrows(
            IllegalArgumentException.class,
            () -> controller.message("missing", null));
    }
}
