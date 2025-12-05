/*
 * File: PathAwareLocaleResolver.java
 * Purpose: Delegates to Accept-Language header resolution but overrides
 * the locale when a path-based locale (set by PathLocaleFilter) is
 * present. Enables '/{locale}/api/v1/...' URLs without modifying
 * controller mappings.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n.resolver;

import java.util.Locale;

import org.springframework.lang.NonNull;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import jakarta.servlet.http.HttpServletRequest;

public final class PathAwareLocaleResolver extends AcceptHeaderLocaleResolver {
  @Override
  public @NonNull Locale resolveLocale(@NonNull HttpServletRequest request) {
    Object attr = request.getAttribute(PathLocaleFilter.ATTR);
    if (attr instanceof String s) {
      return Locale.forLanguageTag(s);
    }
    return super.resolveLocale(request);
  }
}
