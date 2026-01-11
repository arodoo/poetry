/*
 * File: AssignMembershipUseCase.java
 * Purpose: Assign a membership to a user by creating a new record in
 * user_has_membership with calculated start and end dates based on
 * subscription duration. Creates historical audit trail.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.membership.usecase;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import com.poetry.poetry_backend.application.membership.port.*;
import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;

public class AssignMembershipUseCase {
  private final UserHasMembershipCommandPort command;
  private final SubscriptionQueryPort subscriptionQuery;

  public AssignMembershipUseCase(
      UserHasMembershipCommandPort command,
      SubscriptionQueryPort subscriptionQuery) {
    this.command = command;
    this.subscriptionQuery = subscriptionQuery;
  }

  public UserHasMembership execute(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds) {
    var sub = subscriptionQuery.findById(subscriptionId);
    Instant start = Instant.now();
    Instant end = start.plus(sub.durationDays(), ChronoUnit.DAYS);
    return command.create(userId, subscriptionId, sellerCode, zoneIds, start, end);
  }
}
