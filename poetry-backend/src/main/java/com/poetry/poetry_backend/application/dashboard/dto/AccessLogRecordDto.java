/*
 * File: AccessLogRecordDto.java
 * Purpose: DTO to expose detailed physical check-in data on the charts dashboard, joining basic user info to the access_logs table. It acts as a lightweight projection for the frontend metric payload. This ensures we do not expose full backend persistence entities to the client.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dashboard.dto;

import java.time.LocalDateTime;

public record AccessLogRecordDto(
    Long id,
    String userName,
    String email,
    LocalDateTime timestamp) {}
