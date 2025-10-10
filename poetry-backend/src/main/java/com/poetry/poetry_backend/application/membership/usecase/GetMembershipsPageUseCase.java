/*
 * File: GetMembershipsPageUseCase.java
 * Purpose: Retrieve paginated memberships with optional search filter to
 * improve performance by avoiding full table scans on large datasets.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.usecase;

import com.poetry.poetry_backend.application.membership.port.MembershipQueryPort;
import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.domain.shared.model.PageResult;

public class GetMembershipsPageUseCase {
  private final MembershipQueryPort query;

  public GetMembershipsPageUseCase(MembershipQueryPort query) {
    this.query = query;
  }

  public PageResult<Membership> execute(
      int page,
      int size,
      String search) {
    return query.findAllPaged(page, size, search);
  }
}
