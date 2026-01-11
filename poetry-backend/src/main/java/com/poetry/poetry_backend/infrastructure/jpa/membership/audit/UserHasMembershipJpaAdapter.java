/*
 * File: UserHasMembershipJpaAdapter.java
 * Purpose: JPA adapter implementing query and command ports for
 * user_has_membership. Delegates to repository and zones repository.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.membership.audit;

import java.time.Instant;
import java.util.*;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.membership.port.*;
import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;

@Repository
@Transactional
public class UserHasMembershipJpaAdapter
    implements UserHasMembershipQueryPort, UserHasMembershipCommandPort {
  private final UserHasMembershipJpaRepository repo;
  private final UserMembershipZonesRepository zonesRepo;

  public UserHasMembershipJpaAdapter(
      UserHasMembershipJpaRepository repo,
      UserMembershipZonesRepository zonesRepo) {
    this.repo = repo;
    this.zonesRepo = zonesRepo;
  }

  public List<UserHasMembership> findByUserId(Long userId) {
    return repo.findByUserId(userId).stream()
        .map(e -> toModel(e))
        .toList();
  }

  public Optional<UserHasMembership> findActiveByUserId(Long uid, Instant now) {
    return repo.findActiveByUserId(uid, now).map(this::toModel);
  }

  public List<UserHasMembership> findExpiringSoon(Instant now, Instant limit) {
    return repo.findExpiringSoon(now, limit).stream()
        .map(this::toModel).toList();
  }

  public List<UserHasMembership> findExpired(Instant now) {
    return repo.findExpired(now).stream().map(this::toModel).toList();
  }

  public long countActive(Instant now) { return repo.countActive(now); }
  public long countExpired(Instant now) { return repo.countExpired(now); }

  public UserHasMembership create(Long uid, Long subId, String code,
      Set<Long> zones, Instant start, Instant end) {
    var e = new UserHasMembershipEntity();
    e.setUserId(uid);
    e.setSubscriptionId(subId);
    e.setSellerCode(code);
    e.setStartDate(start);
    e.setEndDate(end);
    e.setStatus("active");
    e = repo.save(e);
    saveZones(e.getId(), zones);
    return toModel(e, zones);
  }

  public UserHasMembership updateStatus(Long id, String status) {
    var e = repo.findById(id).orElseThrow();
    e.setStatus(status);
    return toModel(repo.save(e));
  }

  private UserHasMembership toModel(UserHasMembershipEntity e) {
    var zones = new HashSet<>(zonesRepo.findZoneIdsByMembershipId(e.getId()));
    return UserHasMembershipMapper.toDomain(e, zones);
  }

  private UserHasMembership toModel(UserHasMembershipEntity e, Set<Long> z) {
    return UserHasMembershipMapper.toDomain(e, z);
  }

  private void saveZones(Long mid, Set<Long> zones) {
    for (Long zid : zones) {
      var ze = new UserMembershipZonesEntity();
      ze.setMembershipId(mid);
      ze.setZoneId(zid);
      zonesRepo.save(ze);
    }
  }
}
