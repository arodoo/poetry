/*
 * File: I18nConfig.java
 * Purpose: Defines Spring MessageSource and locale resolution strategy for
 * the backend. Configures segmented bundle basenames to keep message files
 * small and domain focused. Provides Accept-Language based resolution with
 * fallback to default locale configured via AppProperties. Exposes
 * LocalValidatorFactoryBean so Bean Validation uses the same message
 * bundles. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n;

import java.util.List;
import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.lang.NonNull;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;

@Configuration
public class I18nConfig {
  private static final String[] BASES = new String[] {
      "classpath:i18n/common/messages",
      "classpath:i18n/error/messages",
      "classpath:i18n/validation/messages",
      "classpath:i18n/auth/messages",
      "classpath:i18n/security/messages",
      "classpath:i18n/infra/messages"
  };

  @Bean
  MessageSource messageSource() {
    var ms = new ReloadableResourceBundleMessageSource();
    ms.setBasenames(BASES);
    ms.setDefaultEncoding("UTF-8");
    ms.setUseCodeAsDefaultMessage(true); // dev friendly; code shown if missing
    ms.setCacheSeconds(0); // could be >300 in prod via profile property
    ms.setAlwaysUseMessageFormat(true);
    return ms;
  }

  @Bean
  AcceptHeaderLocaleResolver localeResolver(AppConfigPort cfg) {
    return new SupportedLocaleResolver(cfg.defaultLocale(), cfg.supportedLocales());
  }

  @Bean
  LocalValidatorFactoryBean validator(MessageSource ms) {
    var f = new LocalValidatorFactoryBean();
    f.setValidationMessageSource(ms);
    return f;
  }

  static class SupportedLocaleResolver extends AcceptHeaderLocaleResolver {
    private final List<String> supported;
    private final Locale defaultLocale;

    SupportedLocaleResolver(String def, List<String> sup) {
      this.defaultLocale = Locale.forLanguageTag(def);
      this.supported = sup == null ? List.of() : sup;
      setDefaultLocale(this.defaultLocale);
    }

    @Override
    public Locale resolveLocale(@NonNull jakarta.servlet.http.HttpServletRequest req) {
      Locale cand = super.resolveLocale(req);
      if (supported.isEmpty()) return cand;
      String tag = cand.toLanguageTag();
      if (supported.stream().anyMatch(tag::equalsIgnoreCase)) return cand;
      return defaultLocale;
    }
  }
}
