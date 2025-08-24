/*
 * File: CorrelationIdProvider.java
 * Purpose: Supplies the current request correlation id using a ThreadLocal
 * set by an HTTP filter. Decouples infrastructure filters from audit
 * logging and other components needing correlation context.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.audit;

public class CorrelationIdProvider {
  private static final ThreadLocal<String> CURRENT = new ThreadLocal<>();
  public void set(String id) { CURRENT.set(id); }
  public String get() { return CURRENT.get(); }
  public void clear() { CURRENT.remove(); }
}
