/*
 * File: HardwareConfig.java
 * Purpose: Spring configuration for hardware service integration.
 * Creates HardwareServiceAdapter bean with configurable base URL.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.hardware;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.infrastructure.hardware.HardwareServiceAdapter;

@Configuration
public class HardwareConfig {

    @Value("${app.hardware.base-url:http://localhost:3000}")
    private String hardwareBaseUrl;

    @Bean
    public HardwareServicePort hardwareServicePort(HttpClientPort httpClient) {
        return new HardwareServiceAdapter(httpClient, hardwareBaseUrl);
    }
}
