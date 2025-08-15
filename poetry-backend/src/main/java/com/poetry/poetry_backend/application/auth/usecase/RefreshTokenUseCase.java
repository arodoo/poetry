/*
 File: RefreshTokenUseCase.java
 Purpose: Use case to refresh an access token via AuthPort.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.auth.usecase;

import com.poetry.poetry_backend.application.auth.port.AuthPort;
import java.util.Map;

public class RefreshTokenUseCase {
    private final AuthPort auth;
    public RefreshTokenUseCase(AuthPort auth){ this.auth = auth; }
    public Map<String, Object> execute(String refreshToken){
        return auth.refresh(refreshToken);
    }
}
