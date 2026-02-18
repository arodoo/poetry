/*
 * File: FingerprintBootstrap.java
 * Purpose: Bootstrap component that ensures admin user has a sample fingerprint.
 * Required for membership eligibility checks in E2E tests.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;
import com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core.FingerprintEntity;
import com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core.FingerprintJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

@Component
public class FingerprintBootstrap {
    private static final Logger log = LoggerFactory.getLogger(FingerprintBootstrap.class);
    private final FingerprintJpaRepository fingerprintRepo;
    private final UserJpaRepository userRepo;

    @Value("${admin.bootstrap.username:admin}")
    private String adminUsername;

    public FingerprintBootstrap(FingerprintJpaRepository fingerprintRepo, UserJpaRepository userRepo) {
        this.fingerprintRepo = fingerprintRepo;
        this.userRepo = userRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    @Order(4)
    public void onApplicationReady() {
        userRepo.findActiveByUsername(adminUsername).ifPresent(user -> {
            if (fingerprintRepo.findByUserId(user.getId()).isEmpty()) {
                FingerprintEntity entity = new FingerprintEntity();
                entity.setUserId(user.getId());
                entity.setFmd("SAMPLE-FMD-DATA-FOR-E2E-TESTING");
                entity.setStatus(FingerprintStatus.ACTIVE);
                entity.setEnrolledAt(Instant.now());
                fingerprintRepo.save(entity);
                log.info("FingerprintBootstrap: sample fingerprint created for user '{}'", adminUsername);
            }
        });
    }
}
