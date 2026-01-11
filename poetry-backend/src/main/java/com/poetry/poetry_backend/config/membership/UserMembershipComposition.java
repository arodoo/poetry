/*
 * File: UserMembershipComposition.java
 * Purpose: Composition root for user_has_membership beans including
 * the new audit-capable use cases with startDate/endDate support.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.membership;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.membership.port.*;
import com.poetry.poetry_backend.application.membership.usecase.*;
import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.*;

@Configuration
public class UserMembershipComposition {
  @Bean
  UserHasMembershipJpaAdapter userHasMembershipJpaAdapter(
      UserHasMembershipJpaRepository repo,
      UserMembershipZonesRepository zonesRepo) {
    return new UserHasMembershipJpaAdapter(repo, zonesRepo);
  }

  @Bean
  AssignMembershipUseCase assignMembershipUseCase(
      UserHasMembershipCommandPort cmd,
      SubscriptionQueryPort subQuery) {
    return new AssignMembershipUseCase(cmd, subQuery);
  }

  @Bean
  RenewMembershipUseCase renewMembershipUseCase(
      UserHasMembershipQueryPort query,
      UserHasMembershipCommandPort cmd,
      SubscriptionQueryPort subQuery) {
    return new RenewMembershipUseCase(query, cmd, subQuery);
  }
}
