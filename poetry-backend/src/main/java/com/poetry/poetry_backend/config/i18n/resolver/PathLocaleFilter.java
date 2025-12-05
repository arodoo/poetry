/*
 * File: PathLocaleFilter.java
 * Purpose: Extracts leading locale segment (e.g. /en/...) from request
 * URI, stores it as a request attribute and exposes a wrapped request
 * with the locale segment removed so existing controller mappings
 * (/api/v1/...) remain unchanged while adding path-locale support.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.i18n.resolver;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
final class PathLocaleFilter extends OncePerRequestFilter {
  static final String ATTR = "path-locale";
  private final List<String> supported;
  private final Pattern pat = Pattern.compile("^[a-zA-Z]{2}([_-][a-zA-Z]{2})?$");

  PathLocaleFilter(com.poetry.poetry_backend.application.common.config.AppConfigPort cfg) {
    this.supported = cfg.supportedLocales();
  }

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest req,
      @NonNull HttpServletResponse res,
      @NonNull FilterChain chain) throws ServletException, IOException {
    String uri = req.getRequestURI();
    if (uri == null || uri.length() < 4) {
      chain.doFilter(req, res);
      return;
    }
    String[] parts = uri.substring(1).split("/", 2);
    String first = parts[0];
    if (!pat.matcher(first).matches()) {
      chain.doFilter(req, res);
      return;
    }
    boolean supportedLocale = supported == null || supported.isEmpty() || supported.stream()
        .anyMatch(s -> s.equalsIgnoreCase(first));
    // Always strip candidate segment so routing works; only set attribute if supported.
    Locale loc = supportedLocale ? Locale.forLanguageTag(first.replace('_', '-')) : null;
    HttpServletRequestWrapper wrap = new HttpServletRequestWrapper(req) {
      private final String stripped = "/" + (parts.length > 1 ? parts[1] : "");
      @Override public String getRequestURI() { return stripped; }
      @Override public String getServletPath() { return stripped; }
    };
    if (loc != null) {
      wrap.setAttribute(ATTR, loc.toLanguageTag());
    }
    chain.doFilter(wrap, res);
  }
}
