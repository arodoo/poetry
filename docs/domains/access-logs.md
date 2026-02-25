# Access Logs Domain

## Overview
The Access Logs domain is responsible for tracking user entries via hardware, particularly focusing on digital fingerprint verification events. It persists and queries the time, identity, and status of physical access attempts.

## Entities
- AccessLogEntity

## Core Capabilities
- **Persist entry attempts:** Record each physical entrance event with timestamps, user identification, and fingerprint metadata.
- **Provide Dashboard Aggregations:** Power analytical queries for active hours, busiest days, and week-over-week access trends.
- **Expose Sub-Dashboards:** Surface recent check-ins in the administrator tabular UI.

## Integration Points
- **Fingerprint Domain:** Acts as a downstream persistence layer attached to the `LoggingVerifyFingerprintUseCase` proxy logic. It listens and documents the outcome of the fingerprint reads.
- **Dashboard Domain:** The Adapter queries Access Logs for metrics (`accessLogTrend`, `activeDaysOfWeek`, etc.).

## Status
- Implemented (Phase 4 completed)
