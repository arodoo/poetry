/*
 * File: UserMutationComposition.java
 * Purpose: Wires mutation use-cases for users: create, update
 * and delete. Update and delete use UserCascadeService for
 * cascade cleanup when a user is deactivated.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.user;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.service.UserCascadeService;
import com.poetry.poetry_backend.application.user.usecase.*;

@Configuration
public class UserMutationComposition {
  @Bean
  CreateUserUseCase createUserUseCase(UserCommandPort c) {
    return new CreateUserUseCase(c);
  }

  @Bean
  UpdateUserUseCase updateUserUseCase(
      UserCommandPort c, UserCascadeService cs) {
    return new UpdateUserUseCase(c, cs);
  }

  @Bean
  DeleteUserUseCase deleteUserUseCase(
      UserCommandPort c, UserCascadeService cs) {
    return new DeleteUserUseCase(c, cs);
  }
}
