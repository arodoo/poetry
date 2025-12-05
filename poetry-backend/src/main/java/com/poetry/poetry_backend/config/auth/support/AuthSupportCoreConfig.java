/*
 * File: AuthSupportCoreConfig.java
 * Purpose: Provides core authentication support beans including audit
 * logging, rate limiting, account lockout, correlation id and idempotency
 * storage. Split from monolithic config to respect max file length.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.auth.support;

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
import com.poetry.poetry_backend.infrastructure.memory.auth.lockout.InMemoryAccountLockoutAdapter;
import com.poetry.poetry_backend.infrastructure.memory.auth.ratelimit.AdaptiveRateLimiterAdapter;
import com.poetry.poetry_backend.infrastructure.memory.auth.ratelimit.InMemoryTokenBucketRateLimiter;
import com.poetry.poetry_backend.infrastructure.monitoring.AuthMetricsPublisher;

import io.micrometer.core.instrument.MeterRegistry;

@Configuration
@Profile("!dev")
public class AuthSupportCoreConfig {
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
        var base = new InMemoryTokenBucketRateLimiter(10, 60, 10);
        return new AdaptiveRateLimiterAdapter(base, 8, 5, 300);
    }

    @Bean
    AccountLockoutPort rawAccountLockout() {
        return new InMemoryAccountLockoutAdapter(5, 60, 1800);
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
