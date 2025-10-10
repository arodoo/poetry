/*
 * File: DeleteSubscriptionUseCase.java
 * Purpose: Coordinate soft deletion of subscription plans via command port
 * with optimistic locking. Enforces soft-delete policy and keeps logic
 * testable while decoupling from persistence layer.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.subscription.usecase;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionCommandPort;

public class DeleteSubscriptionUseCase {
  private final SubscriptionCommandPort command;

  public DeleteSubscriptionUseCase(SubscriptionCommandPort command) {
    this.command = command;
  }

  public void execute(Long id, long version) {
    command.softDelete(id, version);
  }
}
