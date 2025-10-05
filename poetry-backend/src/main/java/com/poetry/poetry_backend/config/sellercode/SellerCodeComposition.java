/*
 * File: SellerCodeComposition.java
 * Purpose: Composition for seller code beans and adapters used by application
 * layer. Wires seller code ports to JPA adapters and exposes use-cases as
 * beans for controllers to consume. Separating composition improves
 * maintainability and supports DI-based testing.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.sellercode;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.sellercode.port.*;
import com.poetry.poetry_backend.application.sellercode.usecase.*;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

@Configuration
public class SellerCodeComposition {
  @Bean
  SellerCodeJpaAdapter sellerCodeJpaAdapter(
      SellerCodeJpaRepository repo, UserJpaRepository userRepo) {
    return new SellerCodeJpaAdapter(repo, userRepo);
  }

  @Bean
  GetAllSellerCodesUseCase getAllSellerCodesUseCase(SellerCodeQueryPort q) {
    return new GetAllSellerCodesUseCase(q);
  }

  @Bean
  GetSellerCodesPageUseCase getSellerCodesPageUseCase(SellerCodeQueryPort q) {
    return new GetSellerCodesPageUseCase(q);
  }

  @Bean
  GetSellerCodeByIdUseCase getSellerCodeByIdUseCase(SellerCodeQueryPort q) {
    return new GetSellerCodeByIdUseCase(q);
  }

  @Bean
  CreateSellerCodeUseCase createSellerCodeUseCase(SellerCodeCommandPort c) {
    return new CreateSellerCodeUseCase(c);
  }

  @Bean
  UpdateSellerCodeUseCase updateSellerCodeUseCase(SellerCodeCommandPort c) {
    return new UpdateSellerCodeUseCase(c);
  }

  @Bean
  DeleteSellerCodeUseCase deleteSellerCodeUseCase(SellerCodeCommandPort c) {
    return new DeleteSellerCodeUseCase(c);
  }
}
