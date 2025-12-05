/*
 * File: InMemoryTokenBucketRateLimiter.java
 * Purpose: Simple thread-safe token bucket limiter for auth endpoints used
 * in development and tests. Limits per-key capacity and refill interval to
 * mitigate brute force attacks on login, register and refresh flows. In
 * production replace with a distributed store (e.g., Redis) adapter.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth.ratelimit;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.poetry.poetry_backend.application.auth.exception.RateLimitExceededException;
import com.poetry.poetry_backend.application.auth.port.security.RateLimiterPort;

public class InMemoryTokenBucketRateLimiter implements RateLimiterPort {
  private static final class Bucket {
    int tokens;
    long lastRefillEpochSecond;
  }

  private final int capacity;
  private final int refillSeconds;
  private final int tokensPerRefill;
  private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

  public InMemoryTokenBucketRateLimiter(
      int capacity, int refillSeconds, int tokensPerRefill) {
    this.capacity = capacity;
    this.refillSeconds = refillSeconds;
    this.tokensPerRefill = tokensPerRefill;
  }

  @Override
  public void acquire(String key) {
    Bucket b = buckets.computeIfAbsent(
        key,
        k -> {
          Bucket nb = new Bucket();
          nb.tokens = capacity;
          nb.lastRefillEpochSecond = now();
          return nb;
        });
    synchronized (b) {
      refill(b);
      if (b.tokens <= 0) {
        throw new RateLimitExceededException("rate limit");
      }
      b.tokens--;
    }
  }

  private void refill(Bucket b) {
    long current = now();
    long elapsed = current - b.lastRefillEpochSecond;
    if (elapsed >= refillSeconds) {
      long cycles = elapsed / refillSeconds;
      int add = (int) (cycles * tokensPerRefill);
      b.tokens = Math.min(capacity, b.tokens + add);
      b.lastRefillEpochSecond = current;
    }
  }

  private long now() {
    return Instant.now().getEpochSecond();
  }
}
