/*
 * File: MembershipJpaMapper.java
 * Purpose: Mapping helper to convert JPA MembershipEntity instances to
 * domain Membership models. Isolates mapping logic from adapters so
 * adapters remain focused on repository interactions and wiring.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.domain.membership.model.MembershipRehydrator;

public final class MembershipJpaMapper {
  private MembershipJpaMapper() {
  }

  public static Membership toDomain(MembershipEntity e) {
    String uName = "";
    if (e.getUser() != null) {
      String fn = e.getUser().getFirstName() != null ? e.getUser().getFirstName() : "";
      String ln = e.getUser().getLastName() != null ? e.getUser().getLastName() : "";
      uName = (fn + " " + ln).trim();
      if (uName.isEmpty())
        uName = e.getUser().getUsername();
    }

    String sName = e.getSubscription() != null ? e.getSubscription().getName() : "";

    Instant nextPaymentDate = null;
    if (e.getSubscription() != null
        && e.getSubscription().getDurationDays() != null
        && e.getCreatedAt() != null) {
      nextPaymentDate = e.getCreatedAt().plus(e.getSubscription().getDurationDays(), ChronoUnit.DAYS);
    }

    String slName = "";
    if (e.getSellerInfo() != null && e.getSellerInfo().getUser() != null) {
      String sfn = e.getSellerInfo().getUser().getFirstName() != null
          ? e.getSellerInfo().getUser().getFirstName()
          : "";
      String sln = e.getSellerInfo().getUser().getLastName() != null
          ? e.getSellerInfo().getUser().getLastName()
          : "";
      slName = (sfn + " " + sln).trim();
      if (slName.isEmpty())
        slName = e.getSellerInfo().getUser().getUsername();
    }

    return MembershipRehydrator.rehydrate(
        e.getId(),
        e.getUserId(),
        uName,
        e.getSubscriptionId(),
        sName,
        e.getSellerCode(),
        slName,
        e.getZoneIds(),
        e.getAllZones(),
        e.getStatus(),
        e.getCreatedAt(),
        e.getUpdatedAt(),
        e.getDeletedAt(),
        nextPaymentDate,
        e.getVersion() == null ? 0L : e.getVersion());
  }
}
