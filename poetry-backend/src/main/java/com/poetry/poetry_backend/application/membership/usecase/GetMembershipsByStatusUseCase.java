/*
 * File: GetMembershipsByStatusUseCase.java
 * Purpose: Use case to retrieve memberships filtered by status (active, expiring, expired).
 * It enriches membership records and maps domain entities to DTOs for display.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.membership.usecase;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;
import com.poetry.poetry_backend.application.membership.dto.MembershipDetail;
import com.poetry.poetry_backend.application.membership.port.UserHasMembershipQueryPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.model.core.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GetMembershipsByStatusUseCase {
  private final UserHasMembershipQueryPort membershipPort;
  private final UserQueryPort userPort;
  private final ResolveMessageUseCase resolve;

  public PageResult<MembershipDetail> execute(String status, Pageable pageable) {
    Instant now = Instant.now();
    PageResult<UserHasMembership> page;

    switch (status.toUpperCase()) {
      case "ACTIVE":
        page = membershipPort.findAllActive(now, pageable);
        break;
      case "EXPIRING":
        Instant limit = now.plus(7, ChronoUnit.DAYS);
        page = membershipPort.findAllExpiring(now, limit, pageable);
        break;
      case "EXPIRED":
        page = membershipPort.findAllExpired(now, pageable);
        break;
      default:
        String msg = resolve.execute("membership.status.invalid", null);
        throw new IllegalArgumentException(msg + ": " + status);
    }

    List<Long> userIds = page.content().stream()
        .map(UserHasMembership::userId)
        .distinct()
        .toList();

    Map<Long, User> users = userPort.findAllById(userIds).stream()
        .collect(Collectors.toMap(User::id, u -> u));

    List<MembershipDetail> details = page.content().stream()
        .map(m -> {
          User u = users.get(m.userId());
          String name = u != null ? u.firstName() + " " + u.lastName() : "Unknown";
          String email = u != null ? u.email() : "";
          return new MembershipDetail(m.id(), m.userId(), name, email,
              m.status(), m.startDate(), m.endDate(), "Standard");
        })
        .toList();

    return new PageResult<>(
        details,
        page.totalElements(),
        page.totalPages(),
        page.currentPage(),
        page.pageSize());
  }
}
