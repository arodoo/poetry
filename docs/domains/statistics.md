# Statistics Domain

## Overview

The statistics domain provides aggregated metrics for the admin dashboard,
including membership counts, expiration tracking, and system health indicators.

## Core Concept

Unlike CRUD-focused domains, statistics is a **read-only aggregation service**
that queries data from other domains (membership, subscription) to compute
real-time metrics without maintaining its own entities.

## Key Components

- **MembershipStats**: Value object containing active, expiring, expired counts
- **GetMembershipStatsUseCase**: Query use case for dashboard statistics
- **MembershipStatsQueryPort**: Port for fetching aggregated membership data

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/statistics/memberships` | Get membership statistics |

### Query Parameters

- `expiringDays` (optional, default: 7): Days threshold for expiring memberships

## Design Decisions

1. **No entity**: Statistics are computed on-demand, not persisted
2. **Read-only**: Only query operations, no mutations
3. **Cross-domain**: Queries membership data via existing repositories
