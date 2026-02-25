/*
 * File: DashboardMetricsDto.java
 * Purpose: DTO representing the 10 aggregated system metrics for the charts dashboard.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dashboard.dto;

import java.util.Map;

public record DashboardMetricsDto(
    Map<String, Long> usersByStatus,
    Map<String, Long> enrollmentsOverTime,
    Map<String, Long> membershipsByStatus,
    Map<String, Long> eventsByType,
    Map<String, Long> subscriptionsByDuration,
    Map<String, Long> scheduledEventsByStatus,
    Map<String, Long> sellerCodesByStatus,
    Map<String, Long> birthdaysThisMonth,
    Map<String, Long> activeHours,
    Map<String, Long> populatedRegions) {}
