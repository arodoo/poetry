/*
 * File: UserJpaCommandSupport.java
 * Purpose: Shared helpers for user command adapter logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.time.LocalDate;

import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.exception.UserVersionMismatchException;
import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.interfaces.v1.user.dto.AddressRequest;

final class UserJpaCommandSupport {
  private UserJpaCommandSupport() {}

  static void applyProfile(
      UserEntity e, String firstName, String lastName,
      String email, String locale, LocalDate birthDate,
      String gender, String phone, AddressRequest addr) {
    e.setFirstName(firstName);
    e.setLastName(lastName);
    e.setEmail(email);
    e.setLocale(locale);
    e.setBirthDate(birthDate);
    e.setGender(gender);
    e.setPhone(phone);
    applyAddress(e, addr);
  }

  private static void applyAddress(
      UserEntity e, AddressRequest addr) {
    AddressEmbeddable a = e.getAddress() != null
        ? e.getAddress() : new AddressEmbeddable();
    if (addr != null) {
      a.setAddressLine1(addr.line1());
      a.setAddressLine2(addr.line2());
      a.setAddressCity(addr.city());
      a.setAddressState(addr.state());
      a.setAddressZip(addr.zip());
      a.setAddressCountry(addr.country());
    }
    e.setAddress(a);
  }

  static UserEntity guard(
      UserJpaRepository repo, Long id, long version) {
    UserEntity entity = repo.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
    Long v = entity.getVersion();
    if (v != null && !v.equals(version)) {
      throw new UserVersionMismatchException(id);
    }
    return entity;
  }

  static User persist(UserJpaRepository repo, UserEntity e) {
    return UserJpaMapper.toDomain(repo.save(e));
  }
}
