/*
 * File: MembershipJpaCommandAdapter.java
 * Purpose: Handles membership command operations including create update
 * and soft delete with validations for user, subscription, seller code
 * and zones. Cascades cancellation to user_has_membership on deactivation
 * or deletion so the fingerprint banner reflects the correct state.
 * Also syncs user_has_membership on create so the stats page reflects
 * all memberships, not just those seeded by bootstrap.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import static com.poetry.poetry_backend.infrastructure.jpa.membership.MembershipJpaCommandSupport.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.UserHasMembershipEntity;
import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.UserHasMembershipJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

public class MembershipJpaCommandAdapter
    implements MembershipCommandPort {
  private final MembershipJpaRepository repo;
  private final UserJpaRepository userRepo;
  private final SubscriptionJpaRepository subscriptionRepo;
  private final SellerCodeJpaRepository sellerCodeRepo;
  private final ZoneJpaRepository zoneRepo;
  private final UserHasMembershipJpaRepository userHasMembershipRepo;

  public MembershipJpaCommandAdapter(
      MembershipJpaRepository repo,
      UserJpaRepository userRepo,
      SubscriptionJpaRepository subscriptionRepo,
      SellerCodeJpaRepository sellerCodeRepo,
      ZoneJpaRepository zoneRepo,
      UserHasMembershipJpaRepository userHasMembershipRepo) {
    this.repo = repo;
    this.userRepo = userRepo;
    this.subscriptionRepo = subscriptionRepo;
    this.sellerCodeRepo = sellerCodeRepo;
    this.zoneRepo = zoneRepo;
    this.userHasMembershipRepo = userHasMembershipRepo;
  }

  public Membership create(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status) {
    validateReferences(
        userId, subscriptionId, sellerCode, zoneIds, allZones,
        userRepo, subscriptionRepo, sellerCodeRepo, zoneRepo);
    MembershipEntity entity = new MembershipEntity();
    applyFields(entity, userId, subscriptionId, sellerCode,
        zoneIds, allZones, status);
    Membership result = persist(repo, entity);
    assignUserHasMembership(userId, subscriptionId, sellerCode, allZones);
    return result;
  }

  public Membership update(
      Long id,
      long version,
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status) {
    validateReferences(
        userId, subscriptionId, sellerCode, zoneIds, allZones,
        userRepo, subscriptionRepo, sellerCodeRepo, zoneRepo);
    MembershipEntity entity = guard(repo, id, version);
    applyFields(entity, userId, subscriptionId, sellerCode,
        zoneIds, allZones, status);
    Membership result = persist(repo, entity);
    if ("inactive".equals(status)) {
      cancelActiveUserHasMembership(userId);
    }
    return result;
  }

  public void softDelete(Long id, long version) {
    MembershipEntity entity = guard(repo, id, version);
    Long userId = entity.getUserId();
    entity.setStatus("inactive");
    entity.setDeletedAt(Instant.now());
    repo.save(entity);
    cancelActiveUserHasMembership(userId);
  }

  private void assignUserHasMembership(
      Long userId, Long subscriptionId,
      String sellerCode, Boolean allZones) {
    int days = subscriptionRepo.findById(subscriptionId)
        .map(s -> s.getDurationDays() != null ? s.getDurationDays() : 30)
        .orElse(30);
    Instant start = Instant.now();
    UserHasMembershipEntity uhm = new UserHasMembershipEntity();
    uhm.setUserId(userId);
    uhm.setSubscriptionId(subscriptionId);
    uhm.setSellerCode(sellerCode);
    uhm.setStartDate(start);
    uhm.setEndDate(start.plus(days, ChronoUnit.DAYS));
    uhm.setAllZones(Boolean.TRUE.equals(allZones));
    uhm.setStatus("active");
    userHasMembershipRepo.save(uhm);
  }

  private void cancelActiveUserHasMembership(Long userId) {
    var active = userHasMembershipRepo
        .findActiveListByUserId(userId, Instant.now());
    for (var uhm : active) {
      uhm.setStatus("cancelled");
      userHasMembershipRepo.save(uhm);
    }
  }
}
