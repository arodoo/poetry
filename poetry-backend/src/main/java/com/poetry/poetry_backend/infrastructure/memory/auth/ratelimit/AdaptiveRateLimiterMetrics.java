/*
 * File: AdaptiveRateLimiterMetrics.java
 * Purpose: Encapsulates mutable counters for adaptive rate limiter to
 * separate metric bookkeeping from core control logic reducing file
 * length in adapter while keeping monitoring accessors. It provides
 * simple increment and snapshot style getters to expose internal state
 * for tests and instrumentation without leaking mutability.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth.ratelimit;

final class AdaptiveRateLimiterMetrics {
    private long penalties;
    private long blocked;
    private long acquired;

    void penalty() {
        penalties++;
    }

    void blocked() {
        blocked++;
    }

    void acquired() {
        acquired++;
    }

    long getPenalties() {
        return penalties;
    }

    long getBlocked() {
        return blocked;
    }

    long getAcquired() {
        return acquired;
    }
}
