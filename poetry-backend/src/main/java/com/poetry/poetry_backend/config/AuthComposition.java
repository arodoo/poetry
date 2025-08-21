/*
 File: AuthComposition.java
 Purpose: Composition root for authentication related wiring and beans.
 This class exposes beans and adapters necessary to connect the
 authentication application ports with infrastructure implementations.
 Keeping composition isolated helps maintain clear dependency direction
 and simplifies testing of authentication flows.
 All Rights Reserved. Arodi Emmanuel
*/

package com.poetry.poetry_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.auth.port.AuthPort;
import com.poetry.poetry_backend.application.auth.usecase.*;
import com.poetry.poetry_backend.infrastructure.memory.auth.InMemoryAuthAdapter;

@Configuration
public class AuthComposition {
  // Expose a single bean for AuthPort to avoid ambiguity
  // during injection
  @Bean
  AuthPort authPort() {
    return new InMemoryAuthAdapter();
  }

  @Bean
  LoginUseCase loginUseCase(AuthPort a) {
    return new LoginUseCase(a);
  }

  @Bean
  RefreshTokenUseCase refreshTokenUseCase(AuthPort a) {
    return new RefreshTokenUseCase(a);
  }

  @Bean
  LogoutUseCase logoutUseCase(AuthPort a) {
    return new LogoutUseCase(a);
  }

  @Bean
  RegisterUseCase registerUseCase(AuthPort a) {
    return new RegisterUseCase(a);
  }
}
