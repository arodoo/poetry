/*
 * File: GetMembershipByIdUseCase.java
 * Purpose: Coordinate retrieval of single membership by ID delegating
 * to query port. Throws domain exception if not found following
 * explicit error handling patterns per application requirements.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.usecase;

import com.poetry.poetry_backend.application.membership.port.MembershipQueryPort;
import com.poetry.poetry_backend.domain.membership.model.Membership;

public class GetMembershipByIdUseCase {
  private final MembershipQueryPort query;

  public GetMembershipByIdUseCase(MembershipQueryPort query) {
    this.query = query;
  }

  public Membership execute(Long id) {
    return query.findById(id);
  }
}
