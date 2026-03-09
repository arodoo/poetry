/*
 * File: UserHasMembershipJpaAdapter.java
 * Purpose: JPA adapter implementing query and command ports for
 * user_has_membership. Delegates to repository and zones repository.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.membership.audit;

import java.time.Instant;
import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.membership.port.*;
import com.poetry.poetry_backend.domain.membership.model.UserHasMembership;
import com.poetry.poetry_backend.domain.shared.model.PageResult;

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
        .map(e -> toModel(e, Instant.now(), null))
        .toList();
  }

  public Optional<UserHasMembership> findActiveByUserId(Long uid, Instant now) {
    return repo.findActiveListByUserId(uid, now).stream()
        .findFirst().map(e -> toModel(e, now, null));
  }

  public List<UserHasMembership> findExpiringSoon(Instant now, Instant limit) {
    return repo.findExpiringSoon(now, limit).stream()
        .map(e -> toModel(e, now, limit)).toList();
  }

  public List<UserHasMembership> findExpired(Instant now) {
    return repo.findExpired(now).stream().map(e -> toModel(e, now, null)).toList();
  }

  public long countActive(Instant now) {
    return repo.countActive(now);
  }

  public long countExpired(Instant now) {
    return repo.countExpired(now);
  }

  public PageResult<UserHasMembership> findAllActive(Instant now, Pageable pageable) {
    return toPageResult(repo.findAllActive(now, pageable), now, null);
  }

  public PageResult<UserHasMembership> findAllExpiring(Instant now, Instant limit,
      Pageable pageable) {
    return toPageResult(repo.findAllExpiring(now, limit, pageable), now, limit);
  }

  public PageResult<UserHasMembership> findAllExpired(Instant now, Pageable pageable) {
    return toPageResult(repo.findAllExpired(now, pageable), now, null);
  }

  private PageResult<UserHasMembership> toPageResult(Page<UserHasMembershipEntity> page, Instant now, Instant limit) {
    return new PageResult<>(
        page.getContent().stream().map(e -> toModel(e, now, limit)).toList(),
        page.getTotalElements(),
        page.getTotalPages(),
        page.getNumber(),
        page.getSize());
  }

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
    return toModel(e, zones, start, null); // Use start date as approx for creation/now
  }

  public UserHasMembership updateStatus(Long id, String status) {
    var e = repo.findById(id).orElseThrow();
    e.setStatus(status);
    return toModel(repo.save(e), Instant.now(), null);
  }

  private UserHasMembership toModel(UserHasMembershipEntity e, Instant now, Instant limit) {
    var zones = new HashSet<>(zonesRepo.findZoneIdsByMembershipId(e.getId()));
    return UserHasMembershipMapper.toDomain(e, zones, now, limit);
  }

  private UserHasMembership toModel(UserHasMembershipEntity e, Set<Long> z, Instant now, Instant limit) {
    return UserHasMembershipMapper.toDomain(e, z, now, limit);
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
