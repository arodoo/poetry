/*
 * File: I18nMessageSourceConfig.java
 * Purpose: Configuration for i18n MessageSource and validation components.
 * Provides MessageSource bean and LocalValidatorFactoryBean for i18n support.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
public class I18nMessageSourceConfig {
  private static final String[] BASES = {
      "classpath:i18n/common/messages",
      "classpath:i18n/error/messages",
      "classpath:i18n/validation/messages",
      "classpath:i18n/auth/messages",
      "classpath:i18n/security/messages",
      "classpath:i18n/infra/messages"
  };

  @Bean MessageSource messageSource() {
    var ms = new ReloadableResourceBundleMessageSource();
    ms.setBasenames(BASES);
    ms.setDefaultEncoding("UTF-8");
    ms.setUseCodeAsDefaultMessage(true);
    ms.setCacheSeconds(0);
    ms.setAlwaysUseMessageFormat(true);
    return ms;
  }

  @Bean LocalValidatorFactoryBean validator(MessageSource ms) {
    var f = new LocalValidatorFactoryBean();
    f.setValidationMessageSource(ms);
    return f;
  }
}