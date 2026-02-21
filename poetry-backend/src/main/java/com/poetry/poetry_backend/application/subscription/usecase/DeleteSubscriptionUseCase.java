/*
 * File: DeleteSubscriptionUseCase.java
 * Purpose: Coordinate soft deletion of subscription plans via command port
 * with optimistic locking. Guards against deletion when active memberships
 * exist, enforcing referential integrity at the application layer.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.usecase;

import com.poetry.poetry_backend.application.membership.port.MembershipQueryPort;
import com.poetry.poetry_backend.application.subscription.port.SubscriptionCommandPort;
import com.poetry.poetry_backend.domain.subscription.exception.SubscriptionHasActiveMembershipsException;

public class DeleteSubscriptionUseCase {
  private final SubscriptionCommandPort command;
  private final MembershipQueryPort membershipQuery;

  public DeleteSubscriptionUseCase(
      SubscriptionCommandPort command,
      MembershipQueryPort membershipQuery) {
    this.command = command;
    this.membershipQuery = membershipQuery;
  }

  public void execute(Long id, long version) {
    if (membershipQuery.existsActiveMembershipForSubscription(id)) {
      throw new SubscriptionHasActiveMembershipsException(id);
    }
    command.softDelete(id, version);
  }
}
