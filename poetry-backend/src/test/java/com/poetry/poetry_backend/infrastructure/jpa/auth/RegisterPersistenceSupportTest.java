/*
 * File: RegisterPersistenceSupportTest.java
 * Purpose: Verify registration persistence assigns admin role.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.auth.port.security.PasswordHasherPort;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

class RegisterPersistenceSupportTest {
  @Test
  void persistUserAssignsAdminRole() {
    UserJpaRepository repo = mock(UserJpaRepository.class);
    PasswordHasherPort hasher = mock(PasswordHasherPort.class);
    when(hasher.hash("pw")).thenReturn("hash");
    when(repo.save(any(UserEntity.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));
    RegisterPersistenceSupport support = new RegisterPersistenceSupport(repo, hasher);
    UserEntity saved = support.persistUser("admin", "a@b.com", "pw");
    assertNotNull(saved.getRoles());
    assertFalse(saved.getRoles().isEmpty());
    assertTrue(saved.getRoles().contains("admin"));
  }
}
