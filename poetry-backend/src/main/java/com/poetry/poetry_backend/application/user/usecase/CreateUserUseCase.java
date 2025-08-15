/*
 File: CreateUserUseCase.java
 Purpose: Use case to create a user via command port.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.User;
import java.util.Set;

public class CreateUserUseCase {
    private final UserCommandPort commands;
    public CreateUserUseCase(UserCommandPort commands){ this.commands = commands; }
    public User execute(String firstName, String lastName, String email, String username, String password, Set<String> roles){
        return commands.create(firstName, lastName, email, username, password, roles);
    }
}
