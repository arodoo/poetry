/*
 * File: DeleteMembershipUseCase.java
 * Purpose: Coordinate soft deletion of memberships by delegating to
 * command port with version check for optimistic locking. Maintains
 * audit trail via deletedAt timestamp following soft delete patterns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.usecase;

import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;

public class DeleteMembershipUseCase {
  private final MembershipCommandPort commands;

  public DeleteMembershipUseCase(MembershipCommandPort commands) {
    this.commands = commands;
  }

  public void execute(Long id, long version) {
    commands.softDelete(id, version);
  }
}
