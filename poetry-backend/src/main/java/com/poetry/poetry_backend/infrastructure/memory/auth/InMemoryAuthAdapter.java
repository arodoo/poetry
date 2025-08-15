/*
 File: InMemoryAuthAdapter.java
 Purpose: Temporary in-memory auth adapter stubbing responses until real security is wired.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.memory.auth;

import com.poetry.poetry_backend.application.auth.port.AuthPort;
import java.util.Map;

public class InMemoryAuthAdapter implements AuthPort {
    public Map<String, Object> login(String u, String p){ return Map.of("token", "fake-jwt", "username", u); }
    public Map<String, Object> refresh(String t){ return Map.of("token", "fake-jwt-refreshed"); }
    public void logout(String t) { /* no-op */ }
    public Map<String, Object> register(Map<String, Object> user){ return user; }
}
