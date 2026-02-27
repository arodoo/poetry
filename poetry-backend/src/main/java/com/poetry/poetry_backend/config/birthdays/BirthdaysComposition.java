/*
 * File: BirthdaysComposition.java
 * Purpose: Spring configuration that wires the birthday-check feature.
 * Creates the JPA adapter as an infrastructure bean and injects it into
 * the application use case, following the Dependency Inversion Principle.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.birthdays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.birthdays.port.BirthdaysQueryPort;
import com.poetry.poetry_backend.application.birthdays.usecase.GetTodaysBirthdaysUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.birthdays.BirthdaysJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.userdemographics.UserDemographicsJpaRepository;

@Configuration
public class BirthdaysComposition {
  @Bean
  BirthdaysJpaAdapter birthdaysJpaAdapter(
      UserDemographicsJpaRepository demographicsRepo,
      UserJpaRepository userRepo) {
    return new BirthdaysJpaAdapter(demographicsRepo, userRepo);
  }

  @Bean
  GetTodaysBirthdaysUseCase getTodaysBirthdaysUseCase(
      BirthdaysQueryPort port) {
    return new GetTodaysBirthdaysUseCase(port);
  }
}
