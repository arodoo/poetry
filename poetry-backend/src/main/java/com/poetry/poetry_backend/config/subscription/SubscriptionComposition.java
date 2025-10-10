/*
 * File: SubscriptionComposition.java
 * Purpose: Wiring configuration for subscription feature. Creates and
 * injects all beans (adapters, use cases) required for dependency
 * injection. Centralizes composition root per DDD hexagonal architecture.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.subscription;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.subscription.port.SubscriptionCommandPort;
import com.poetry.poetry_backend.application.subscription.port.SubscriptionQueryPort;
import com.poetry.poetry_backend.application.subscription.usecase.CreateSubscriptionUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.DeleteSubscriptionUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.GetAllSubscriptionsUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.GetSubscriptionByIdUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.GetSubscriptionsPageUseCase;
import com.poetry.poetry_backend.application.subscription.usecase.UpdateSubscriptionUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;

@Configuration
public class SubscriptionComposition {
  @Bean
  SubscriptionJpaAdapter subscriptionJpaAdapter(SubscriptionJpaRepository repo) {
    return new SubscriptionJpaAdapter(repo);
  }

  @Bean
  GetAllSubscriptionsUseCase getAllSubscriptionsUseCase(
      SubscriptionQueryPort q) {
    return new GetAllSubscriptionsUseCase(q);
  }

  @Bean
  GetSubscriptionsPageUseCase getSubscriptionsPageUseCase(
      SubscriptionQueryPort q) {
    return new GetSubscriptionsPageUseCase(q);
  }

  @Bean
  GetSubscriptionByIdUseCase getSubscriptionByIdUseCase(
      SubscriptionQueryPort q) {
    return new GetSubscriptionByIdUseCase(q);
  }

  @Bean
  CreateSubscriptionUseCase createSubscriptionUseCase(
      SubscriptionCommandPort c) {
    return new CreateSubscriptionUseCase(c);
  }

  @Bean
  UpdateSubscriptionUseCase updateSubscriptionUseCase(
      SubscriptionCommandPort c) {
    return new UpdateSubscriptionUseCase(c);
  }

  @Bean
  DeleteSubscriptionUseCase deleteSubscriptionUseCase(
      SubscriptionCommandPort c) {
    return new DeleteSubscriptionUseCase(c);
  }
}
