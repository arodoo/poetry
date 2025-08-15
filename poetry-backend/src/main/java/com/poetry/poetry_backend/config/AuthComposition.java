/*
 File: AuthComposition.java
 Purpose: Composition root wiring auth use cases to the in-memory adapter.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.config;

import com.poetry.poetry_backend.application.auth.port.AuthPort;
import com.poetry.poetry_backend.application.auth.usecase.*;
import com.poetry.poetry_backend.infrastructure.memory.auth.InMemoryAuthAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthComposition {
    // Expose a single bean for AuthPort to avoid ambiguity during injection
    @Bean AuthPort authPort(){ return new InMemoryAuthAdapter(); }
    @Bean LoginUseCase loginUseCase(AuthPort a){ return new LoginUseCase(a); }
    @Bean RefreshTokenUseCase refreshTokenUseCase(AuthPort a){ return new RefreshTokenUseCase(a); }
    @Bean LogoutUseCase logoutUseCase(AuthPort a){ return new LogoutUseCase(a); }
    @Bean RegisterUseCase registerUseCase(AuthPort a){ return new RegisterUseCase(a); }
}
