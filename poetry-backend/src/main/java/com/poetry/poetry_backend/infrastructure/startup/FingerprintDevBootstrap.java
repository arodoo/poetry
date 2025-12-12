/*
 * File: FingerprintDevBootstrap.java
 * Purpose: Clears all fingerprints from R503 sensor on dev startup. Ensures
 * hardware and database stay synchronized when using ddl-auto=create.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;

/** Clears R503 sensor on startup when in dev mode (ddl-auto=create). */
@Component
public class FingerprintDevBootstrap {
    private static final Logger log = LoggerFactory.getLogger(
            FingerprintDevBootstrap.class);

    private final HttpClientPort httpClient;

    @Value("${app.hardware.base-url:http://localhost:3000}")
    private String hardwareBaseUrl;

    @Value("${spring.jpa.hibernate.ddl-auto:none}")
    private String ddlAuto;

    public FingerprintDevBootstrap(HttpClientPort httpClient) {
        this.httpClient = httpClient;
    }

    @Order(100)
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        if (!"create".equals(ddlAuto) && !"create-drop".equals(ddlAuto)) {
            log.debug("FingerprintDevBootstrap: ddl-auto={}, skipping", ddlAuto);
            return;
        }

        log.info("FingerprintDevBootstrap: clearing R503 sensor (ddl={})", ddlAuto);
        try {
            String url = hardwareBaseUrl + "/fingerprint/clear-all";
            Map<?, ?> response = httpClient.post(url, Map.of(), Map.of(), Map.class);
            log.info("FingerprintDevBootstrap: sensor cleared: {}", response);
        } catch (Exception e) {
            log.warn("FingerprintDevBootstrap: failed to clear sensor: {}", e.getMessage());
        }
    }
}
