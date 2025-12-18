/*
 * File: HardwareConfig.java
 * Purpose: Spring configuration for hardware service integration.
 * Creates HardwareServiceAdapter bean using HardwareProperties.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.hardware;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.infrastructure.hardware.HardwareServiceAdapter;

@Configuration
public class HardwareConfig {

    @Bean
    public HardwareServicePort hardwareServicePort(
            HttpClientPort httpClient,
            HardwareProperties props) {
        return new HardwareServiceAdapter(httpClient, props.getBaseUrl());
    }
}
