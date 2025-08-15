/*
 File: LoginUseCase.java
 Purpose: Use case to authenticate a user and issue tokens via AuthPort.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.auth.usecase;

import com.poetry.poetry_backend.application.auth.port.AuthPort;
import java.util.Map;

public class LoginUseCase {
    private final AuthPort auth;
    public LoginUseCase(AuthPort auth){ this.auth = auth; }
    public Map<String, Object> execute(String username, String password){
        return auth.login(username, password);
    }
}
