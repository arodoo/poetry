/*
 * File: MembershipBootstrap.java
 * Purpose: Bootstrap component that injects 20 sample memberships on
 * application startup by creating dedicated test users, subscriptions,
 * seller codes, and zones specifically for membership testing.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.membership.usecase.CreateMembershipUseCase;
import com.poetry.poetry_backend.application.sellercode.usecase.CreateSellerCodeUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.CreateSubscriptionUseCase;
import com.poetry.poetry_backend.application.user.usecase.CreateUserUseCase;
import com.poetry.poetry_backend.application.zone.usecase.CreateZoneUseCase;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;
import com.poetry.poetry_backend.domain.user.model.User;
import com.poetry.poetry_backend.domain.zone.model.Zone;

@Component
public class MembershipBootstrap {
  private static final Logger log =
      LoggerFactory.getLogger(MembershipBootstrap.class);
  private final CreateMembershipUseCase createMembership;
  private final CreateUserUseCase createUser;
  private final CreateSubscriptionUseCase createSubscription;
  private final CreateSellerCodeUseCase createSellerCode;
  private final CreateZoneUseCase createZone;

  @Value("${membership.bootstrap.enabled:true}")
  private boolean enabled;

  @Value("${membership.bootstrap.count:20}")
  private int membershipCount;

  public MembershipBootstrap(
      CreateMembershipUseCase createMembership,
      CreateUserUseCase createUser,
      CreateSubscriptionUseCase createSubscription,
      CreateSellerCodeUseCase createSellerCode,
      CreateZoneUseCase createZone) {
    this.createMembership = createMembership;
    this.createUser = createUser;
    this.createSubscription = createSubscription;
    this.createSellerCode = createSellerCode;
    this.createZone = createZone;
  }

  @EventListener(ApplicationReadyEvent.class)
  public void onApplicationReady() {
    if (!enabled) {
      log.info("MembershipBootstrap: disabled via config");
      return;
    }

    try {
      log.info("MembershipBootstrap: creating {} memberships",
          membershipCount);
      injectSampleMemberships();
      log.info("MembershipBootstrap: injection complete");
    } catch (Exception e) {
      log.error("MembershipBootstrap failed: {}", e.getMessage(), e);
    }
  }

  private void injectSampleMemberships() {
    List<User> users = createTestUsers(5);
    List<Subscription> subs = createTestSubscriptions(3);
    List<SellerCode> codes = createTestSellerCodes(5);
    List<Zone> zones = createTestZones(3);

    log.info("Created test data: {} users, {} subs, {} codes, {} zones",
        users.size(), subs.size(), codes.size(), zones.size());

    for (int i = 0; i < membershipCount; i++) {
      try {
        Long userId = users.get(i % users.size()).id();
        Long subId = subs.get(i % subs.size()).id();
        String code = codes.get(i % codes.size()).code();
        Set<Long> zoneIds = selectZones(i, zones);
        boolean allZones = (i % 5 == 0);
        createMembership.execute(
            userId, subId, code, zoneIds, allZones, "active");
      } catch (Exception e) {
        log.debug("Failed membership {}: {}", i, e.getMessage());
      }
    }
  }

  private List<User> createTestUsers(int count) {
    List<User> result = new ArrayList<>();
    for (int i = 0; i < count; i++) {
      try {
        User user = createUser.execute(
            "MemberFirst" + i,
            "MemberLast" + i,
            "member" + i + "@test.com",
            "member" + i,
            "en",
            "Pass123!",
            Set.of("ROLE_USER"),
            "active");
        result.add(user);
      } catch (Exception e) {
        log.debug("Failed user {}: {}", i, e.getMessage());
      }
    }
    return result;
  }

  private List<Subscription> createTestSubscriptions(int count) {
    List<Subscription> result = new ArrayList<>();
    for (int i = 0; i < count; i++) {
      try {
        Subscription sub = createSubscription.execute(
            "MemberPlan" + i,
            "Membership test plan " + i,
            new BigDecimal("9.99"),
            "USD",
            30,
            Set.of("feature1", "feature2"),
            "active");
        result.add(sub);
      } catch (Exception e) {
        log.debug("Failed subscription {}: {}", i, e.getMessage());
      }
    }
    return result;
  }

  private List<SellerCode> createTestSellerCodes(int count) {
    List<SellerCode> result = new ArrayList<>();
    for (int i = 0; i < count; i++) {
      try {
        SellerCode code = createSellerCode.execute(
            "MEMBERCODE" + i, "ORG" + i, 1L, "active");
        result.add(code);
      } catch (Exception e) {
        log.debug("Failed code {}: {}", i, e.getMessage());
      }
    }
    return result;
  }

  private List<Zone> createTestZones(int count) {
    List<Zone> result = new ArrayList<>();
    for (int i = 0; i < count; i++) {
      try {
        Zone zone = createZone.execute(
            "MemberZone" + i, "Test zone " + i, 1L);
        result.add(zone);
      } catch (Exception e) {
        log.debug("Failed zone {}: {}", i, e.getMessage());
      }
    }
    return result;
  }

  private Set<Long> selectZones(int index, List<Zone> zones) {
    if (zones.isEmpty()) return Set.of();
    int offset = index % zones.size();
    int count = Math.min(2, zones.size());
    return zones.subList(offset, Math.min(offset + count, zones.size()))
        .stream()
        .map(Zone::id)
        .collect(java.util.stream.Collectors.toSet());
  }
}
