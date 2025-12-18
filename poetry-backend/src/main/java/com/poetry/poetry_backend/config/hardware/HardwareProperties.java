/*
 * File: HardwareProperties.java
 * Purpose: Centralized configuration for hardware service URLs.
 * Single source of truth for all hardware service endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.hardware;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.hardware")
public class HardwareProperties {

    private String baseUrl = "http://localhost:3002";

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getFingerprintApiUrl() {
        return baseUrl + "/api/fingerprint";
    }
}
