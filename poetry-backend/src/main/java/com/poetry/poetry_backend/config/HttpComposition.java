/*
 Composition that assembles HTTP‑level infrastructure components. It
 exposes an ETagPort based on SHA‑256 and an idempotency adapter backed
 by JPA. These beans are consumed by filters and controllers at the
 interface layer, keeping concerns separated. All Rights Reserved. Arodi
 Emmanuel
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
