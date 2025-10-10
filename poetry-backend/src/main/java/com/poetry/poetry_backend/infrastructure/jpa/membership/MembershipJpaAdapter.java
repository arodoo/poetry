/*
 * File: MembershipJpaAdapter.java
 * Purpose: Main adapter delegating to query and command adapters providing
 * unified implementation of both query and command ports for memberships
 * ensuring clean transaction boundaries and separation of concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import java.util.List;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.application.membership.port.MembershipQueryPort;
import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

@Transactional
public class MembershipJpaAdapter
    implements MembershipQueryPort, MembershipCommandPort {
  private final MembershipJpaQueryAdapter queryAdapter;
  private final MembershipJpaCommandAdapter commandAdapter;

  public MembershipJpaAdapter(
      MembershipJpaRepository repo,
      UserJpaRepository userRepo,
      SubscriptionJpaRepository subscriptionRepo,
      SellerCodeJpaRepository sellerCodeRepo,
      ZoneJpaRepository zoneRepo) {
    this.queryAdapter = new MembershipJpaQueryAdapter(repo);
    this.commandAdapter = new MembershipJpaCommandAdapter(
        repo, userRepo, subscriptionRepo, sellerCodeRepo, zoneRepo);
  }

  public List<Membership> findAll() {
    return queryAdapter.findAll();
  }

  public PageResult<Membership> findAllPaged(
      int page,
      int size,
      String search) {
    return queryAdapter.findAllPaged(page, size, search);
  }

  public Membership findById(Long id) {
    return queryAdapter.findById(id);
  }

  public Membership create(
      Long userId,
      Long subscriptionId,
      String sellerCode,
      Set<Long> zoneIds,
      Boolean allZones,
      String status) {
    return commandAdapter.create(
        userId,
        subscriptionId,
        sellerCode,
        zoneIds,
        allZones,
        status);
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
    return commandAdapter.update(
        id,
        version,
        userId,
        subscriptionId,
        sellerCode,
        zoneIds,
        allZones,
        status);
  }

  public void softDelete(Long id, long version) {
    commandAdapter.softDelete(id, version);
  }
}
