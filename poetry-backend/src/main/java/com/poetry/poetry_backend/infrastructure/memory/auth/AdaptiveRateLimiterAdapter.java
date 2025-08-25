/*
 * File: AdaptiveRateLimiterAdapter.java
 * Purpose: Decorates a base RateLimiterPort with adaptive backoff by
 * applying temporary cool-down delays after repeated near-threshold
 * usage patterns. Simplified after extracting metrics to helper to
 * satisfy file length limits without losing behavior. All Rights
 * Reserved. Arodi Emmanuel
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.poetry.poetry_backend.application.auth.exception.RateLimitExceededException;
import com.poetry.poetry_backend.application.auth.port.RateLimiterPort;

public class AdaptiveRateLimiterAdapter implements RateLimiterPort { // Window class extracted.
  private final RateLimiterPort delegate;
  private final Map<String, AdaptiveWindow> windows = new ConcurrentHashMap<>();
  private final int softBurst;
  private final long basePenaltySeconds;
  private final long maxPenaltySeconds;
  private final AdaptiveRateLimiterMetrics metrics = new AdaptiveRateLimiterMetrics();

  public AdaptiveRateLimiterAdapter(
      RateLimiterPort delegate, int softBurst, long basePenaltySeconds, long maxPenaltySeconds) {
    this.delegate = delegate;
    this.softBurst = softBurst;
    this.basePenaltySeconds = basePenaltySeconds;
    this.maxPenaltySeconds = maxPenaltySeconds;
  }

  @Override
  public void acquire(String key) {
    AdaptiveWindow w = windows.computeIfAbsent(key, k -> new AdaptiveWindow());
    long now = now();
    if (w.penaltyUntil > now) {
      metrics.blocked();
      throw new RateLimitExceededException("cooldown");
    }
    try {
      delegate.acquire(key);
      metrics.acquired();
      if (w.nearHits > 0) w.nearHits--;
    } catch (RateLimitExceededException ex) {
      metrics.blocked();
      escalate(w, now);
      throw ex;
    }
    if (++w.nearHits >= softBurst) {
      escalate(w, now);
      metrics.blocked();
      throw new RateLimitExceededException("adaptive");
    }
  }

  private void escalate(AdaptiveWindow w, long now) {
    long current = Math.max(0, w.penaltyUntil - now);
    long next = current == 0 ? basePenaltySeconds : current * 2;
    if (next > maxPenaltySeconds) next = maxPenaltySeconds;
    w.penaltyUntil = now + next;
    w.nearHits = 0;
    metrics.penalty();
  }

  public long getPenaltyEvents() { return metrics.getPenalties(); }
  public long getBlockedRequests() { return metrics.getBlocked(); }
  public long getAcquired() { return metrics.getAcquired(); }
  public long getActivePenaltyWindows() {
    long n = now();
    return windows.values().stream().filter(w -> w.penaltyUntil > n).count();
  }
  private long now() { return Instant.now().getEpochSecond(); }
}
