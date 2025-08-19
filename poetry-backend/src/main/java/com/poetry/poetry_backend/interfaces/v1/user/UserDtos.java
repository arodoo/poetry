/*
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.User;

public final class UserDtos {
  public record UserResponse(
      Long id,
      String firstName,
      String lastName,
      String email,
      String username,
      boolean active,
      Set<String> roles) { }

  public record UserUpdateRequest(
      String firstName, 
      String lastName, 
      String email, 
      Set<String> roles, 
      boolean active) { }

  public record UserCreateRequest(
      String firstName,
      String lastName,
      String email,
      String username,
      String password,
      Set<String> roles) { }

  public static UserResponse toResponse(User u) {
    return new UserResponse(
        u.getId(),
        u.getFirstName(),
        u.getLastName(),
        u.getEmail(),
        u.getUsername(),
        u.isActive(),
        u.getRoles());
  }
}
