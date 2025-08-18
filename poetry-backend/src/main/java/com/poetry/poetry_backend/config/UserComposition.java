/*
 File: UserComposition.java
 Purpose: Composition root wiring user use cases to the JPA adapter.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.config;

import com.poetry.poetry_backend.application.user.port.*;
import com.poetry.poetry_backend.application.user.usecase.*;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserComposition {
    @Bean UserJpaAdapter userJpaAdapter(UserJpaRepository repo){ return new UserJpaAdapter(repo); }
    @Bean GetAllUsersUseCase getAllUsersUseCase(UserQueryPort q){ return new GetAllUsersUseCase(q); }
    @Bean GetUserByIdUseCase getUserByIdUseCase(UserQueryPort q){ return new GetUserByIdUseCase(q); }
    @Bean CreateUserUseCase createUserUseCase(UserCommandPort c){ return new CreateUserUseCase(c); }
    @Bean UpdateUserUseCase updateUserUseCase(UserCommandPort c){ return new UpdateUserUseCase(c); }
    @Bean DeleteUserUseCase deleteUserUseCase(UserCommandPort c){ return new DeleteUserUseCase(c); }
}
