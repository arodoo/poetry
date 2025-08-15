/*
 File: RegisterUseCase.java
 Purpose: Use case to register a user via AuthPort.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.auth.usecase;

import com.poetry.poetry_backend.application.auth.port.AuthPort;
import java.util.Map;

public class RegisterUseCase {
    private final AuthPort auth;
    public RegisterUseCase(AuthPort auth){ this.auth = auth; }
    public Map<String, Object> execute(Map<String, Object> payload){
        return auth.register(payload);
    }
}
