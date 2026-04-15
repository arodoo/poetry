/*
 * File: UserComposition.java
 * Purpose: Wires user JPA adapters, cascade service, and query
 * use-cases. Mutations live in UserMutationComposition.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.user;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.application.fingerprint.port.*;
import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.application.user.port.*;
import com.poetry.poetry_backend.application.user.service.UserCascadeService;
import com.poetry.poetry_backend.application.user.usecase.*;
import com.poetry.poetry_backend.infrastructure.jpa.user.*;
import com.poetry.poetry_backend.infrastructure.jpa.userdemographics.*;

@Configuration
public class UserComposition {
  @Bean
  UserJpaAdapter userJpaAdapter(
      UserJpaRepository r, PasswordHasherPort h) {
    return new UserJpaAdapter(r, h);
  }

  @Bean
  UserDemographicsCommandAdapter userDemographicsCommandAdapter(
      UserDemographicsJpaRepository r) {
    return new UserDemographicsCommandAdapter(r);
  }

  @Bean
  UserCascadeService userCascadeService(
      FingerprintQueryPort fq, FingerprintCommandPort fc,
      MembershipCommandPort mc, SellerCodeCommandPort sc,
      UserDemographicsCommandPort dc) {
    return new UserCascadeService(fq, fc, mc, sc, dc);
  }

  @Bean
  GetAllUsersUseCase getAllUsersUseCase(UserQueryPort q) {
    return new GetAllUsersUseCase(q);
  }

  @Bean
  GetUsersPageUseCase getUsersPageUseCase(UserQueryPort q) {
    return new GetUsersPageUseCase(q);
  }

  @Bean
  GetUserByIdUseCase getUserByIdUseCase(UserQueryPort q) {
    return new GetUserByIdUseCase(q);
  }
}
