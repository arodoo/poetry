/*
 * File: InMemoryAccountLockoutAdapter.java
 * Purpose: In-memory adaptive lockout implementation tracking failures
 * per username (and optionally IP) with exponential backoff windows.
 * Designed for dev/testing; production variant should externalize to
 * shared cache (Redis) for horizontal scaling. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.poetry.poetry_backend.application.auth.exception.AccountLockedException;
import com.poetry.poetry_backend.application.auth.port.AccountLockoutPort;

public class InMemoryAccountLockoutAdapter implements AccountLockoutPort { // State extracted.
  private final Map<String, LockState> states = new ConcurrentHashMap<>();
  private final int threshold; // failures before first lock
  private final long baseLockSeconds; // initial lock length
  private final long maxLockSeconds;
  private final LockMetrics metrics = new LockMetrics();

  public InMemoryAccountLockoutAdapter(int threshold, long baseLockSeconds, long maxLockSeconds) {
    this.threshold = threshold;
    this.baseLockSeconds = baseLockSeconds;
    this.maxLockSeconds = maxLockSeconds;
  }

  public void ensureNotLocked(String username, String clientIp) {
    LockState st = states.get(key(username, clientIp));
    long now = now();
    if (st != null && st.lockUntil > now) throw new AccountLockedException("locked");
  }

  public void onFailure(String username, String clientIp) {
    LockState st = states.computeIfAbsent(key(username, clientIp), k -> new LockState());
    long now = now();
    synchronized (st) {
      metrics.fail();
      if (st.lockUntil > now) return;
      st.failures++;
      if (st.failures >= threshold) lock(st, now);
    }
  }

  private void lock(LockState st, long now) {
    int over = st.failures - threshold;
    long lock = baseLockSeconds * (1L << Math.min(over, 10));
    if (lock > maxLockSeconds) lock = maxLockSeconds;
    st.lockUntil = now + lock;
    metrics.lock();
  }

  public void onSuccess(String username, String clientIp) {
    LockState st = states.get(key(username, clientIp));
    if (st != null) {
      synchronized (st) {
        st.failures = 0;
        st.lockUntil = 0;
      }
    }
  }

  public long getTotalLockEvents() { return metrics.getLocks(); }
  public long getTotalFailures() { return metrics.getFailures(); }
  public long getActiveLockCount() {
    long now = now();
    return states.values().stream().filter(s -> s.lockUntil > now).count();
  }
  private String key(String u, String ip) { return u + "|" + (ip == null ? "-" : ip); }
  private long now() { return Instant.now().getEpochSecond(); }
}
