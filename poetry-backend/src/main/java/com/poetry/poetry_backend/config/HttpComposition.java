/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.infrastructure.http.ETagSha256Adapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyRepository;

@Configuration
public class HttpComposition {
  @Bean
  ETagPort eTagPort() {
    return new ETagSha256Adapter();
  }

  @Bean
  IdempotencyJpaAdapter idempotencyJpaAdapter(IdempotencyRepository repo) {
    return new IdempotencyJpaAdapter(repo);
  }
}
