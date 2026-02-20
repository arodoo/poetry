/*
 * File: UserDemographicsComposition.java
 * Purpose: Wires UserDemographics ports, adapter, and use cases as beans.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.userdemographics;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.userdemographics.port.UserDemographicsCommandPort;
import com.poetry.poetry_backend.application.userdemographics.port.UserDemographicsQueryPort;
import com.poetry.poetry_backend.application.userdemographics.usecase.GetUserDemographicsUseCase;
import com.poetry.poetry_backend.application.userdemographics.usecase.UpsertUserDemographicsUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.userdemographics.UserDemographicsJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.userdemographics.UserDemographicsJpaRepository;

@Configuration
public class UserDemographicsComposition {
  @Bean
  UserDemographicsJpaAdapter userDemographicsJpaAdapter(
      UserDemographicsJpaRepository repo, UserJpaRepository userRepo) {
    return new UserDemographicsJpaAdapter(repo, userRepo);
  }

  @Bean
  UpsertUserDemographicsUseCase upsertUserDemographicsUseCase(
      UserDemographicsCommandPort c) {
    return new UpsertUserDemographicsUseCase(c);
  }

  @Bean
  GetUserDemographicsUseCase getUserDemographicsUseCase(
      UserDemographicsQueryPort q) {
    return new GetUserDemographicsUseCase(q);
  }
}
