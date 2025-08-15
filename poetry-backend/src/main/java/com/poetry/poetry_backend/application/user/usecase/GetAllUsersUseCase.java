/*
 File: GetAllUsersUseCase.java
 Purpose: Use case to retrieve all users via query port.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.model.User;
import java.util.List;

public class GetAllUsersUseCase {
    private final UserQueryPort query;
    public GetAllUsersUseCase(UserQueryPort query){ this.query = query; }
    public List<User> execute(){ return query.findAll(); }
}
