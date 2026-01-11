/*
 * File: MembershipStats.java
 * Purpose: Domain record holding membership statistics counts for
 * dashboard display. Includes active, expiring soon, expired totals.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.statistics.model;

public record MembershipStats(
    long activeCount,
    long expiringSoonCount,
    long expiredCount,
    long totalCount) {

  public static MembershipStats of(long active, long expiring, long expired) {
    return new MembershipStats(active, expiring, expired,
        active + expiring + expired);
  }
}
