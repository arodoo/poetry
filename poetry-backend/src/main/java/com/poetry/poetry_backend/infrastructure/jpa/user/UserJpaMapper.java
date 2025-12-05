/*
 * File: UserJpaMapper.java
 * Purpose: Mapping helper to convert JPA UserEntity instances to domain
 * User models. This isolates mapping logic from adapters so that adapters
 * remain focused on repository interactions and wiring. The mapper keeps
 * conversion code reusable and testable.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.user.model.core.UserRehydrator;

public final class UserJpaMapper {
    private UserJpaMapper() {
        // utility
    }

    public static User toDomain(UserEntity e) {
        return UserRehydrator.rehydrate(
                e.getId(),
                e.getFirstName(),
                e.getLastName(),
                e.getEmail(),
                e.getUsername(),
                e.getLocale(),
                e.getStatus(),
                e.getRoles(),
                e.getCreatedAt(),
                e.getUpdatedAt(),
                e.getDeletedAt(),
                e.getVersion() == null ? 0L : e.getVersion());
    }
}