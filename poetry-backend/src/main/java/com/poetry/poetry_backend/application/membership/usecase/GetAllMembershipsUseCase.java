/*
 * File: GetAllMembershipsUseCase.java
 * Purpose: Coordinate retrieval of all active memberships by delegating
 * to query port. Returns list of membership aggregates for display in
 * list views following read-only use case patterns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.membership.port.MembershipQueryPort;
import com.poetry.poetry_backend.domain.membership.model.Membership;

public class GetAllMembershipsUseCase {
  private final MembershipQueryPort query;

  public GetAllMembershipsUseCase(MembershipQueryPort query) {
    this.query = query;
  }

  public List<Membership> execute() {
    return query.findAll();
  }
}
