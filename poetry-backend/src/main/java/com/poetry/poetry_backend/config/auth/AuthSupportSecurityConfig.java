/*
 * File: AuthSupportSecurityConfig.java
 * Purpose: Defines security related support beans (password policy,
 * email normalization and secret rotation job) separated from core
 * config to reduce file size and keep concerns isolated. It centralizes
 * cross-cutting security helpers that are not domain aggregates. It also
 * wires rotation job so secret rollover is observable and testable.
 * All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.auth.port.security.PasswordPolicyPort;
import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.application.auth.port.support.EmailNormalizerPort;
import com.poetry.poetry_backend.infrastructure.monitoring.SecretAgeRotationJob;
import com.poetry.poetry_backend.infrastructure.security.EmailNormalizerSimpleAdapter;
import com.poetry.poetry_backend.infrastructure.security.PasswordPolicySimpleAdapter;

import io.micrometer.core.instrument.MeterRegistry;

@Configuration
public class AuthSupportSecurityConfig {
  @Bean
  PasswordPolicyPort passwordPolicy() { return new PasswordPolicySimpleAdapter(); }

  @Bean
  EmailNormalizerPort emailNormalizer() { return new EmailNormalizerSimpleAdapter(); }

  @Bean
  SecretAgeRotationJob secretAgeRotationJob(
      AuthProperties props, MeterRegistry reg, AuditLoggerPort audit) {
    return new SecretAgeRotationJob(props, reg, audit);
  }
}
