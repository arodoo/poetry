/*
 * File: SecretAgeRotationJob.java
 * Purpose: Scheduled job emitting metrics and audit events regarding
 * signing secret age relative to configured maximum. Provides proactive
 * visibility for rotation hygiene by recording approaching and overdue
 * states without auto-rotating (manual ops decision). All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.monitoring;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

import com.poetry.poetry_backend.application.auth.port.AuditLoggerPort;
import com.poetry.poetry_backend.config.auth.AuthProperties;

import io.micrometer.core.instrument.MeterRegistry;

public class SecretAgeRotationJob {
    private static final Logger log = LoggerFactory.getLogger(SecretAgeRotationJob.class);
    private final AuthProperties props;
    private final MeterRegistry reg;
    private final AuditLoggerPort audit;

    public SecretAgeRotationJob(AuthProperties props, MeterRegistry reg, AuditLoggerPort audit) {
        this.props = props;
        this.reg = reg;
        this.audit = audit;
    }

    @Scheduled(fixedDelayString = "PT5M")
    public void checkAge() {
        String issuedAtRaw = props.getSecretIssuedAt();
        if (issuedAtRaw == null || issuedAtRaw.isBlank()) {
            return; // nothing to evaluate
        }
        try {
            long issuedEpoch = OffsetDateTime.parse(issuedAtRaw)
                    .toInstant().getEpochSecond();
            long maxAge = props.getMaxSecretAgeSeconds();
            long age = Instant.now().getEpochSecond() - issuedEpoch;
            double pct = (double) age / (double) maxAge;
            reg.gauge("auth_secret_age_seconds", age);
            reg.gauge("auth_secret_age_pct", pct);
            if (pct >= 1.0) {
                reg.counter("auth_secret_overdue_total").increment();
                audit.record("auth.secret.overdue", null, "auth.secret.overdue");
                log.warn("Authentication secret exceeded max age: age={} max={} issuedAt={}",
                        age, maxAge, issuedAtRaw);
            } else if (pct >= 0.9) {
                reg.counter("auth_secret_rotation_due_total").increment();
                audit.record("auth.secret.rotation_due", null, "auth.secret.rotation_due");
            }
        } catch (DateTimeParseException ex) {
            log.warn("Invalid secretIssuedAt format: {}", issuedAtRaw);
        }
    }
}
