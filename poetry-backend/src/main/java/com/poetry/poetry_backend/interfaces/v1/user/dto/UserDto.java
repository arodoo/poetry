/*
 * File: UserDto.java
 * Purpose: Legacy facade for user DTOs. Use individual DTO classes
 * (UserResponse, UserCreateRequest, UserUpdateRequest) directly.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.user.dto;

import com.poetry.poetry_backend.domain.user.model.User;

public final class UserDto {
  private UserDto() {}

  public static UserResponse toResponse(User u) {
    return UserResponse.fromDomain(u);
  }
}
