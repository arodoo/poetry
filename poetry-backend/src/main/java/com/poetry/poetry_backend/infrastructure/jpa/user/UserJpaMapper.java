/*
 * File: UserJpaMapper.java
 * Purpose: Mapping helper to convert JPA UserEntity instances to domain
 * User models. Isolates mapping logic from adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.user.model.core.UserRehydrator;

public final class UserJpaMapper {
  private UserJpaMapper() { }

  public static User toDomain(UserEntity e) {
    AddressEmbeddable a = e.getAddress() != null
        ? e.getAddress() : new AddressEmbeddable();
    return UserRehydrator.rehydrate(
        e.getId(), e.getFirstName(), e.getLastName(),
        e.getEmail(), e.getUsername(), e.getLocale(),
        e.getStatus(), e.getRoles(),
        e.getBirthDate(), e.getGender(), e.getPhone(),
        a.getAddressLine1(), a.getAddressLine2(),
        a.getAddressCity(), a.getAddressState(),
        a.getAddressZip(), a.getAddressCountry(),
        e.getCreatedAt(), e.getUpdatedAt(),
        e.getDeletedAt(),
        e.getVersion() == null ? 0L : e.getVersion());
  }
}
