/*
 * File: AuthSupportDevConfig.java
 * Purpose: Development profile configuration that disables rate limiting
 * and account lockout to allow E2E tests to run without hitting 429 errors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import com.poetry.poetry_backend.application.auth.port.security.AccountLockoutPort;
import com.poetry.poetry_backend.application.auth.port.security.RateLimiterPort;
import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.common.port.IdempotencyPort;
import com.poetry.poetry_backend.infrastructure.jpa.audit.AuditEventRepository;
import com.poetry.poetry_backend.infrastructure.jpa.audit.CorrelationIdProvider;
import com.poetry.poetry_backend.infrastructure.jpa.audit.PersistentAuditLoggerAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyRepository;
import com.poetry.poetry_backend.infrastructure.memory.auth.lockout.NoOpAccountLockout;
import com.poetry.poetry_backend.infrastructure.memory.auth.ratelimit.NoOpRateLimiter;
import com.poetry.poetry_backend.infrastructure.monitoring.AuthMetricsPublisher;

import io.micrometer.core.instrument.MeterRegistry;

@Configuration
@Profile("dev")
public class AuthSupportDevConfig {
    @Bean
    CorrelationIdProvider correlationIdProvider() {
        return new CorrelationIdProvider();
    }

    @Bean
    AuditLoggerPort auditLogger(AuditEventRepository repo, CorrelationIdProvider id) {
        return new PersistentAuditLoggerAdapter(repo, id);
    }

    @Bean
    RateLimiterPort rawRateLimiter() {
        return new NoOpRateLimiter();
    }

    @Bean
    AccountLockoutPort rawAccountLockout() {
        return new NoOpAccountLockout();
    }

    @Primary
    @Bean
    AuthMetricsPublisher metricsPublisher(
            RateLimiterPort limiter, AccountLockoutPort lock, MeterRegistry reg) {
        return new AuthMetricsPublisher(limiter, lock, reg);
    }

    @Bean
    IdempotencyPort idempotencyPort(IdempotencyRepository repo) {
        return new IdempotencyJpaAdapter(repo);
    }
}
