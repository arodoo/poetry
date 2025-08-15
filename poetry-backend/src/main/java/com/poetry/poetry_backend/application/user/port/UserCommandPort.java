/*
 File: UserCommandPort.java
 Purpose: Application port for user mutating operations.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.port;

import com.poetry.poetry_backend.domain.user.model.User;
import java.util.Set;

public interface UserCommandPort {
    User create(String firstName, String lastName, String email, String username, String password, Set<String> roles);
    User update(Long id, String firstName, String lastName, String email, Set<String> roles, boolean active);
    void softDelete(Long id);
}
