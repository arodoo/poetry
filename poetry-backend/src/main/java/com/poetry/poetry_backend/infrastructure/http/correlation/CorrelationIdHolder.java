/*
 * File: CorrelationIdHolder.java
 * Purpose: Transitional holder kept for backward compatibility with
 * earlier code expecting a static correlation accessor. Prefer
 * CorrelationIdProvider; this delegates to provider ThreadLocal for
 * DI-friendly usage. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.http.correlation;

import com.poetry.poetry_backend.infrastructure.jpa.audit.CorrelationIdProvider;

public class CorrelationIdHolder {
  private final CorrelationIdProvider provider;
  public CorrelationIdHolder(CorrelationIdProvider provider) { this.provider = provider; }
  public String current() { return provider.get(); }
}