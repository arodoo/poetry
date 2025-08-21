/*
 * File: UserComposition.java
 * Purpose: Composition for user-related beans and adapters used by the
 * application layer. This class wires user ports to JPA or in-memory
 * adapters and exposes use-cases as beans for controllers to consume.
 * Separating composition improves maintainability and supports DI-based
 * testing.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.user.port.*;
import com.poetry.poetry_backend.application.user.usecase.*;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

@Configuration
public class UserComposition {
  @Bean
  UserJpaAdapter userJpaAdapter(UserJpaRepository repo) {
    return new UserJpaAdapter(repo);
  }

  @Bean
  GetAllUsersUseCase getAllUsersUseCase(UserQueryPort q) {
    return new GetAllUsersUseCase(q);
  }

  @Bean
  GetUserByIdUseCase getUserByIdUseCase(UserQueryPort q) {
    return new GetUserByIdUseCase(q);
  }

  @Bean
  CreateUserUseCase createUserUseCase(UserCommandPort c) {
    return new CreateUserUseCase(c);
  }

  @Bean
  UpdateUserUseCase updateUserUseCase(UserCommandPort c) {
    return new UpdateUserUseCase(c);
  }

  @Bean
  DeleteUserUseCase deleteUserUseCase(UserCommandPort c) {
    return new DeleteUserUseCase(c);
  }
}
