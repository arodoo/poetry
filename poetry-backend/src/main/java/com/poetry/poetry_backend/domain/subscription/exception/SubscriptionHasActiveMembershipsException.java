/*
 * File: SubscriptionHasActiveMembershipsException.java
 * Purpose: Exception thrown when attempting to delete a subscription that
 * still has active memberships assigned to users. Prevents orphaned
 * membership records and ensures business integrity on deletion.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.subscription.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class SubscriptionHasActiveMembershipsException
    extends RuntimeException {

  public SubscriptionHasActiveMembershipsException(Long subscriptionId) {
    super("error.subscription.hasActiveMembers");
  }
}
