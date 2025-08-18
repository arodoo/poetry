/*
 HTTP DTOs for the user endpoints and mappers from domain to response.
 Records define request and response shapes independent of the domain
 model. The toResponse method converts the aggregate to a stable API
 view, keeping presentation concerns isolated. All Rights Reserved.
 Arodi Emmanuel
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
