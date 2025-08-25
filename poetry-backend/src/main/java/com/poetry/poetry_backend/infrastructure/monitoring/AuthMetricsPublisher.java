/*
 * File: AuthMetricsPublisher.java
 * Purpose: Micrometer integration publishing counters and gauges for
 * auth rate limiting and account lockout adapters. Wraps underlying
 * adapters to keep monitoring concerns out of business logic while
 * exposing same ports. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.monitoring;

import com.poetry.poetry_backend.application.auth.exception.AccountLockedException;
import com.poetry.poetry_backend.application.auth.exception.RateLimitExceededException;
import com.poetry.poetry_backend.application.auth.port.AccountLockoutPort;
import com.poetry.poetry_backend.application.auth.port.RateLimiterPort;

import io.micrometer.core.instrument.MeterRegistry;

public class AuthMetricsPublisher implements RateLimiterPort, AccountLockoutPort {
    private final RateLimiterPort limiter;
    private final AccountLockoutPort lockout;
    private final MeterRegistry reg;

    public AuthMetricsPublisher(RateLimiterPort limiter, AccountLockoutPort lockout,
            MeterRegistry reg) {
        this.limiter = limiter;
        this.lockout = lockout;
        this.reg = reg;
    }

    public void acquire(String key) {
        try {
            limiter.acquire(key);
            reg.counter("auth_rate_acquire_total").increment();
        } catch (RateLimitExceededException ex) {
            reg.counter("auth_rate_block_total").increment();
            throw ex;
        }
    }

    public void ensureNotLocked(String user, String ip) {
        try {
            lockout.ensureNotLocked(user, ip);
        } catch (AccountLockedException ex) {
            reg.counter("auth_lockout_block_total").increment();
            throw ex;
        }
    }

    public void onFailure(String user, String ip) {
        lockout.onFailure(user, ip);
        reg.counter("auth_login_failure_total").increment();
    }

    public void onSuccess(String user, String ip) { lockout.onSuccess(user, ip); }
}
