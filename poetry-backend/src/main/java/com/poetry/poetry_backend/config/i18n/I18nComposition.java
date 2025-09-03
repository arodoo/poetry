/*
 * File: I18nComposition.java
 * Purpose: Main composition root for i18n module.
 * Imports all i18n configuration classes to wire the module.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({
    I18nMessageSourceConfig.class,
    I18nLocaleConfig.class,
    I18nAdapterConfig.class,
    I18nUseCaseConfig.class
})
public class I18nComposition {
  // Main composition class that imports all i18n configurations
}
