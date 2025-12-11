/*
 * File: FingerprintCleanupConfig.java
 * Purpose: Spring configuration wiring cleanup job and use case beans.
 * Enables scheduling for periodic fingerprint archival.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.fingerprint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.application.fingerprint.usecase.cleanup.FingerprintCleanupUseCase;
import com.poetry.poetry_backend.infrastructure.jobs.fingerprint.FingerprintCleanupJob;

@Configuration
@EnableScheduling
public class FingerprintCleanupConfig {

    @Bean
    FingerprintCleanupUseCase fingerprintCleanupUseCase(
            FingerprintQueryPort queryPort,
            FingerprintCommandPort commandPort,
            HardwareServicePort hardwarePort) {
        return new FingerprintCleanupUseCase(queryPort, commandPort, hardwarePort);
    }

    @Bean
    FingerprintCleanupJob fingerprintCleanupJob(
            FingerprintCleanupUseCase cleanupUseCase) {
        return new FingerprintCleanupJob(cleanupUseCase);
    }
}
