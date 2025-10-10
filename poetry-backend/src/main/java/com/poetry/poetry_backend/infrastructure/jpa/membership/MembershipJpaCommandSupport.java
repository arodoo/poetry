/*
 * File: MembershipJpaCommandSupport.java
 * Purpose: Helper utilities for membership command operations including
 * guard validation and entity persistence. Extracted to keep command
 * adapter focused and within line limits while centralizing logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import java.util.Set;

import com.poetry.poetry_backend.domain.membership.exception.MembershipNotFoundException;
import com.poetry.poetry_backend.domain.membership.exception.MembershipVersionMismatchException;
import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

final class MembershipJpaCommandSupport {
  private MembershipJpaCommandSupport() {}

  static void applyFields(
      MembershipEntity entity,
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status) {
    entity.setUserId(userId);
    entity.setSubscriptionId(subscriptionId);
    entity.setSellerCode(sellerCode);
    entity.setZoneIds(zoneIds != null ? zoneIds : Set.of());
    entity.setAllZones(allZones != null ? allZones : false);
    if (entity.getStatus() == null || entity.getStatus().isBlank()) {
      entity.setStatus(status != null ? status : "active");
    } else {
      entity.setStatus(status != null ? status : entity.getStatus());
    }
  }

  static void validateReferences(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      UserJpaRepository userRepo,
      SubscriptionJpaRepository subscriptionRepo,
      SellerCodeJpaRepository sellerCodeRepo,
      ZoneJpaRepository zoneRepo) {
    if (!userRepo.findActiveById(userId).isPresent()) {
      throw new IllegalArgumentException(
          "membership.user.invalid: " + userId);
    }
    if (!subscriptionRepo.findActiveById(subscriptionId).isPresent()) {
      throw new IllegalArgumentException(
          "membership.subscription.invalid: " + subscriptionId);
    }
    if (!sellerCodeRepo.findActiveByCode(sellerCode).isPresent()) {
      throw new IllegalArgumentException(
          "membership.sellerCode.invalid: " + sellerCode);
    }
    if (allZones != null && !allZones && zoneIds != null) {
      for (Long zoneId : zoneIds) {
        if (!zoneRepo.findActiveById(zoneId).isPresent()) {
          throw new IllegalArgumentException(
              "membership.zone.invalid: " + zoneId);
        }
      }
    }
  }

  static MembershipEntity guard(
      MembershipJpaRepository repository,
      Long id,
      long version) {
    MembershipEntity entity =
        repository.findById(id)
            .orElseThrow(() -> new MembershipNotFoundException(id));
    Long currentVersion = entity.getVersion();
    if (currentVersion != null && !currentVersion.equals(version)) {
      throw new MembershipVersionMismatchException(id);
    }
    return entity;
  }

  static Membership persist(
      MembershipJpaRepository repository,
      MembershipEntity entity) {
    return MembershipJpaMapper.toDomain(repository.save(entity));
  }
}
