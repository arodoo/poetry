/*
 * File: I18nComposition.java
 * Purpose: Composition root wiring i18n MessageSource, LocaleResolver,
 * Validator and adapter / use cases to satisfy module blueprint. This class
 * configures the Spring beans for internationalization components in a clean
 * architecture manner.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;
import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.application.i18n.usecase.GetSupportedLocalesUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;
import com.poetry.poetry_backend.infrastructure.memory.i18n.InMemoryI18nAdapter;

@Configuration
public class I18nComposition {
  private static final String[] BASES = {
      "classpath:i18n/common/messages",
      "classpath:i18n/error/messages",
      "classpath:i18n/validation/messages",
      "classpath:i18n/auth/messages",
      "classpath:i18n/security/messages",
      "classpath:i18n/infra/messages" };

  @Bean MessageSource messageSource() {
    var ms = new ReloadableResourceBundleMessageSource();
    ms.setBasenames(BASES); ms.setDefaultEncoding("UTF-8");
    ms.setUseCodeAsDefaultMessage(true); ms.setCacheSeconds(0);
    ms.setAlwaysUseMessageFormat(true); return ms; }

  @Bean AcceptHeaderLocaleResolver localeResolver(AppConfigPort cfg) {
    return new SupportedLocaleResolver(cfg.defaultLocale(), cfg.supportedLocales()); }

  @Bean LocalValidatorFactoryBean validator(MessageSource ms) {
    var f = new LocalValidatorFactoryBean(); f.setValidationMessageSource(ms); return f; }

  @Bean I18nQueryPort i18nQueryPort(MessageSource ms, AppConfigPort cfg) {
    return new InMemoryI18nAdapter(ms, cfg); }

  @Bean GetSupportedLocalesUseCase getSupportedLocalesUseCase(I18nQueryPort port) {
    return new GetSupportedLocalesUseCase(port); }

  @Bean ResolveMessageUseCase resolveMessageUseCase(I18nQueryPort port) {
    return new ResolveMessageUseCase(port); }
}
