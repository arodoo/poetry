/*
 File: UserComposition.java
 Purpose: Composition root wiring user use cases to the in-memory adapter.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.config;

import com.poetry.poetry_backend.application.user.port.*;
import com.poetry.poetry_backend.application.user.usecase.*;
import com.poetry.poetry_backend.infrastructure.memory.user.InMemoryUserAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserComposition {
    @Bean InMemoryUserAdapter inMemoryUserAdapter(){ return new InMemoryUserAdapter(); }
    @Bean GetAllUsersUseCase getAllUsersUseCase(UserQueryPort q){ return new GetAllUsersUseCase(q); }
    @Bean GetUserByIdUseCase getUserByIdUseCase(UserQueryPort q){ return new GetUserByIdUseCase(q); }
    @Bean CreateUserUseCase createUserUseCase(UserCommandPort c){ return new CreateUserUseCase(c); }
    @Bean UpdateUserUseCase updateUserUseCase(UserCommandPort c){ return new UpdateUserUseCase(c); }
    @Bean DeleteUserUseCase deleteUserUseCase(UserCommandPort c){ return new DeleteUserUseCase(c); }
}
