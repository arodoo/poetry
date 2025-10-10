/*
 * File: CreateMembershipUseCase.java
 * Purpose: Coordinate creation of new memberships by validating input
 * using domain rules and persisting via command port. Returns created
 * domain object while isolating side-effects for testability.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.usecase;

import java.util.Set;

import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.domain.membership.model.Membership;

public class CreateMembershipUseCase {
  private final MembershipCommandPort command;

  public CreateMembershipUseCase(MembershipCommandPort command) {
    this.command = command;
  }

  public Membership execute(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status) {
    return command.create(
        userId,
        subscriptionId,
        sellerCode,
        zoneIds,
        allZones,
        status);
  }
}
