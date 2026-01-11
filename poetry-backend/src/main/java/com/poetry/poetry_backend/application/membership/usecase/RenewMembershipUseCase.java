/*
 * File: RenewMembershipUseCase.java
 * Purpose: Handle membership renewal by creating a new membership record
 * starting after the current one expires. Marks previous membership as
 * completed, preserving full audit history.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.membership.usecase;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import com.poetry.poetry_backend.application.membership.port.*;
import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;

public class RenewMembershipUseCase {
  private final UserHasMembershipQueryPort query;
  private final UserHasMembershipCommandPort command;
  private final SubscriptionQueryPort subscriptionQuery;

  public RenewMembershipUseCase(
      UserHasMembershipQueryPort query,
      UserHasMembershipCommandPort command,
      SubscriptionQueryPort subscriptionQuery) {
    this.query = query;
    this.command = command;
    this.subscriptionQuery = subscriptionQuery;
  }

  public UserHasMembership execute(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds) {
    var now = Instant.now();
    var current = query.findActiveByUserId(userId, now);
    var sub = subscriptionQuery.findById(subscriptionId);
    Instant start = current.map(UserHasMembership::endDate).orElse(now);
    Instant end = start.plus(sub.durationDays(), ChronoUnit.DAYS);
    current.ifPresent(m -> command.updateStatus(m.id(), "completed"));
    return command.create(userId, subscriptionId, sellerCode, zoneIds, start, end);
  }
}
