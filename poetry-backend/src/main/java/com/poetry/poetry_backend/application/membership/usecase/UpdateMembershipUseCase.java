/*
 * File: UpdateMembershipUseCase.java
 * Purpose: Coordinate updates to existing memberships by validating
 * input enforcing domain rules and invoking command port to persist
 * changes. Returns updated domain object isolating side-effects.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.usecase;

import java.util.Set;

import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.domain.membership.model.Membership;

public class UpdateMembershipUseCase {
  private final MembershipCommandPort commands;

  public UpdateMembershipUseCase(MembershipCommandPort commands) {
    this.commands = commands;
  }

  public Membership execute(
      Long id,
      long version,
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status) {
    return commands.update(
        id,
        version,
        userId,
        subscriptionId,
        sellerCode,
        zoneIds,
        allZones,
        status);
  }
}
