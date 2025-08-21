/*
 File: AppProperties.java
 Purpose: Strongly-typed record for application configuration properties.
 This record maps configuration properties from the environment or
 configuration files into a validated structure used by adapters and
 composition classes. Centralizing config shapes improves discoverability
 and ensures validation of runtime values early in application startup.
 All Rights Reserved. Arodi Emmanuel
*/

package com.poetry.poetry_backend.infrastructure.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Validated
@ConfigurationProperties(prefix = "app")
public record AppProperties(
    @NotBlank String apiBasePath,
    List<String> corsAllowedOrigins,
    @Min(1) int idempotencyTtlSeconds,
    boolean logJson,
    // http client configuration
    @Min(1) int httpConnectTimeoutMs,
    @Min(1) int httpReadTimeoutMs,
    @Min(1) int httpRetryMaxAttempts,
    @Min(0) int httpRetryBackoffMs) { }
