/*
 File: HttpComposition.java
 Purpose: Composition root wiring HTTP-related ports/adapters such as ETagPort.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.config;

import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.infrastructure.http.ETagSha256Adapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HttpComposition {
    @Bean ETagPort eTagPort(){ return new ETagSha256Adapter(); }
    @Bean IdempotencyJpaAdapter idempotencyJpaAdapter(IdempotencyRepository repo){ return new IdempotencyJpaAdapter(repo); }
}
