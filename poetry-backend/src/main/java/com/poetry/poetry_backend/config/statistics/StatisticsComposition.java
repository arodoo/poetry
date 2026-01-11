/*
 * File: StatisticsComposition.java
 * Purpose: Bean configuration for statistics module wiring use cases
 * to their ports and exposing as Spring beans.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.statistics;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.statistics.port.MembershipStatsQueryPort;
import com.poetry.poetry_backend.application.statistics.usecase.GetMembershipStatsUseCase;

@Configuration
public class StatisticsComposition {
  @Bean
  GetMembershipStatsUseCase getMembershipStatsUseCase(
      MembershipStatsQueryPort port) {
    return new GetMembershipStatsUseCase(port);
  }
}
