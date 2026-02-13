/*
 * File: MembershipDetail.java
 * Purpose: DTO containing membership details enriched with user information.
 * Used for listing members with their status.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.membership.dto;

import java.time.Instant;

public record MembershipDetail(
        Long id,
        Long userId,
        String userName,
        String userEmail,
        String status,
        Instant startDate,
        Instant endDate,
        Instant createdAt,
        String planName) {
}
