/*
 * File: UserJpaMapper.java
 * Purpose: Mapping helper to convert JPA UserEntity instances to domain
 * User models. This isolates mapping logic from adapters so that adapters
 * remain focused on repository interactions and wiring. The mapper keeps
 * conversion code reusable and testable.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import com.poetry.poetry_backend.domain.user.model.User;
public final class UserJpaMapper {
    private UserJpaMapper() {
        // utility
    }

    public static User toDomain(UserEntity e) {
        return new User(
                e.getId(),
                e.getFirstName(),
                e.getLastName(),
                e.getEmail(),
                e.getUsername(),
                e.isActive(),
                e.getRoles());
    }
}