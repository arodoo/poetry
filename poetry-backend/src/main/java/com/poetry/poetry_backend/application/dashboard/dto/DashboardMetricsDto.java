/*
 * File: DashboardMetricsDto.java
 * Purpose: Data Transfer Object consolidating multiple business-value metrics for the frontend overview. It bundles aggregate statistics such as active hours, regional demographics, and daily trends into a single snapshot. This acts as the primary payload powering the analytics dashboards.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dashboard.dto;

import java.util.List;
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
    Map<String, Long> populatedRegions,
    Map<String, Long> accessLogTrend,
    Map<String, Long> activeDaysOfWeek,
    List<AccessLogRecordDto> recentAccessLogs) {}
