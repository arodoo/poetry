/*
 * File: MembershipQueryPort.java
 * Purpose: Define query operations to retrieve membership data used
 * by the application layer. This port abstracts read-only access
 * decoupling use-cases from storage implementation and enabling
 * in-memory testing.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.membership.port;

import java.util.List;

import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.domain.shared.model.PageResult;

public interface MembershipQueryPort {
  List<Membership> findAll();

  PageResult<Membership> findAllPaged(
      int page,
      int size,
      String search);

  Membership findById(Long id);
}
