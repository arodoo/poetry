/*
 File: UserQueryPort.java
 Purpose: Application port for querying users from persistence.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.port;

import com.poetry.poetry_backend.domain.user.model.User;
import java.util.List;

public interface UserQueryPort {
    List<User> findAll();
    User findById(Long id);
}
