/*
 * File: MembershipBootstrap.java
 * Purpose: Bootstrap component that injects 20 sample memberships on
 * application startup. Uses support helper to create dependencies and
 * modifies expiration dates to simulate active, expiring, and expired states.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.membership.usecase.AssignMembershipUseCase;
import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;
import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.zone.model.Zone;
import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.UserHasMembershipEntity;
import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.UserHasMembershipJpaRepository;

@Component
public class MembershipBootstrap {
  private static final Logger log = LoggerFactory.getLogger(MembershipBootstrap.class);

  private final AssignMembershipUseCase assignMembership;
  private final MembershipBootstrapSupport support;
  private final UserHasMembershipJpaRepository membershipRepo;

  @Value("${membership.bootstrap.enabled:true}")
  private boolean enabled;

  @Value("${membership.bootstrap.count:20}")
  private int membershipCount;

  public MembershipBootstrap(
      AssignMembershipUseCase assignMembership,
      MembershipBootstrapSupport support,
      UserHasMembershipJpaRepository membershipRepo) {
    this.assignMembership = assignMembership;
    this.support = support;
    this.membershipRepo = membershipRepo;
  }

  @EventListener(ApplicationReadyEvent.class)
  @Transactional
  @Order(5)
  public void onApplicationReady() {
    if (!enabled) {
      log.info("MembershipBootstrap: disabled via config");
      return;
    }
    try {
      log.info("MembershipBootstrap: starting injection");
      injectSampleMemberships();
      log.info("MembershipBootstrap: injection complete");
    } catch (Exception e) {
      log.error("MembershipBootstrap failed: {}", e.getMessage(), e);
    }
  }

  private void injectSampleMemberships() {
    List<User> users = support.createTestUsers(membershipCount);
    List<Subscription> subs = support.createTestSubscriptions(3);
    List<SellerCode> codes = support.createTestSellerCodes(5);
    List<Zone> zones = support.createTestZones(3);

    if (users.isEmpty() || subs.isEmpty() || users.size() < membershipCount) {
      log.info("MembershipBootstrap: skipping, need {} users but got {}", 
               membershipCount, users.size());
      return;
    }

    for (int i = 0; i < membershipCount; i++) {
      try {
        Long userId = users.get(i).id();
        Long subId = subs.get(i % subs.size()).id();
        String code = codes.get(i % codes.size()).code();
        Set<Long> zoneIds = support.selectZones(i, zones);
        boolean allZones = (i % 5 == 0);

        // Use AssignMembershipUseCase to create an audit entry in user_has_membership
        UserHasMembership uh = assignMembership.execute(userId, subId, code, zoneIds);
        updateMembershipDates(uh.userId(), i);
      } catch (Exception e) {
        log.warn("Failed membership {}: {}", i, e.getMessage());
      }
    }
  }

  private void updateMembershipDates(Long userId, int index) {
    List<UserHasMembershipEntity> entities = membershipRepo.findByUserId(userId);
    if (entities.isEmpty())
      return;

    UserHasMembershipEntity entity = entities.get(0);
    Instant now = Instant.now();

    // Distribute states:
    // 0,1: Active (future)
    // 2: Expiring Soon (< 7 days)
    // 3: Expired (past)
    int type = index % 4;

    if (type == 2) {
      entity.setEndDate(now.plus(3, ChronoUnit.DAYS));
    } else if (type == 3) {
      entity.setEndDate(now.minus(5, ChronoUnit.DAYS));
      // Keep status active to test "Expired but status active" logic
      // or set to generated status. Logic relies on dates.
    } else {
      // Ensure plenty of time
      entity.setEndDate(now.plus(30, ChronoUnit.DAYS));
    }
    membershipRepo.save(entity);
  }
}
