/*
 * File: GetAllAuthsUseCaseTest.java
 * Purpose: Tests retrieval of all auths via use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.auth.port.AuthQueryPort;
import com.poetry.poetry_backend.application.auth.usecase.crud.GetAllAuthsUseCase;
import com.poetry.poetry_backend.domain.auth.model.Auth;

class GetAllAuthsUseCaseTest {
  @Test
  void returnsList() {
    AuthQueryPort q = new AuthQueryPort() {
      public List<Auth> findAll() {
        return List.of(new Auth("1", "u", false));
      }

      public java.util.Optional<Auth> findById(String id) {
        return java.util.Optional.empty();
      }
    };
    var uc = new GetAllAuthsUseCase(q);
    assertEquals(1, uc.execute().size());
  }
}
