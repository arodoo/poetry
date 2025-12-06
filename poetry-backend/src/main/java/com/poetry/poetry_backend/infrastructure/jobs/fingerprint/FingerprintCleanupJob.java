/*
 * File: FingerprintCleanupJob.java
 * Purpose: Scheduled job that runs daily to archive inactive fingerprints.
 * Frees R503 slots by archiving templates with no activity past threshold.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jobs.fingerprint;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import com.poetry.poetry_backend.application.fingerprint.usecase.cleanup.FingerprintCleanupResult;
import com.poetry.poetry_backend.application.fingerprint.usecase.cleanup.FingerprintCleanupUseCase;

public class FingerprintCleanupJob {
    private static final Logger log = LoggerFactory.getLogger(FingerprintCleanupJob.class);

    private final FingerprintCleanupUseCase cleanupUseCase;

    @Value("${app.fingerprint.inactivity-days:90}")
    private int inactivityDays;

    @Value("${app.fingerprint.cleanup-batch-size:50}")
    private int batchSize;

    @Value("${app.fingerprint.cleanup-enabled:true}")
    private boolean enabled;

    public FingerprintCleanupJob(FingerprintCleanupUseCase cleanupUseCase) {
        this.cleanupUseCase = cleanupUseCase;
    }

    @Scheduled(cron = "${app.fingerprint.cleanup-cron:0 0 3 * * *}")
    public void runCleanup() {
        if (!enabled) {
            log.debug("Fingerprint cleanup disabled");
            return;
        }

        Instant cutoff = Instant.now().minus(inactivityDays, ChronoUnit.DAYS);
        log.info("Running fingerprint cleanup: cutoff={}, batch={}", cutoff, batchSize);

        FingerprintCleanupResult result = cleanupUseCase.execute(cutoff, batchSize);

        log.info("Cleanup complete: archived={} slots={}",
                result.archivedCount(), result.slotIdsToDelete());
    }
}
