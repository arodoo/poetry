/*
 * File: MembershipComposition.java
 * Purpose: Composition root for membership-related beans and adapters.
 * Wires membership ports to JPA adapters and exposes use-cases as beans
 * for controllers to consume following dependency injection patterns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.membership;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.application.membership.port.MembershipQueryPort;
import com.poetry.poetry_backend.application.membership.usecase.*;
import com.poetry.poetry_backend.infrastructure.jpa.membership.MembershipJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.membership.MembershipJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

@Configuration
public class MembershipComposition {
  @Bean
  MembershipJpaAdapter membershipJpaAdapter(
      MembershipJpaRepository membershipRepo,
      UserJpaRepository userRepo,
      SubscriptionJpaRepository subscriptionRepo,
      SellerCodeJpaRepository sellerCodeRepo,
      ZoneJpaRepository zoneRepo) {
    return new MembershipJpaAdapter(
        membershipRepo,
        userRepo,
        subscriptionRepo,
        sellerCodeRepo,
        zoneRepo);
  }

  @Bean
  GetAllMembershipsUseCase getAllMembershipsUseCase(
      MembershipQueryPort q) {
    return new GetAllMembershipsUseCase(q);
  }

  @Bean
  GetMembershipsPageUseCase getMembershipsPageUseCase(
      MembershipQueryPort q) {
    return new GetMembershipsPageUseCase(q);
  }

  @Bean
  GetMembershipByIdUseCase getMembershipByIdUseCase(
      MembershipQueryPort q) {
    return new GetMembershipByIdUseCase(q);
  }

  @Bean
  CreateMembershipUseCase createMembershipUseCase(
      MembershipCommandPort c) {
    return new CreateMembershipUseCase(c);
  }

  @Bean
  UpdateMembershipUseCase updateMembershipUseCase(
      MembershipCommandPort c) {
    return new UpdateMembershipUseCase(c);
  }

  @Bean
  DeleteMembershipUseCase deleteMembershipUseCase(
      MembershipCommandPort c) {
    return new DeleteMembershipUseCase(c);
  }
}
