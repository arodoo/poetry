/*
 * File: AccessLogAdapter.java
 * Purpose: Implementation of the AccessLogPort using Spring Data JPA. This adapter translates the domain request to log an access event into an AccessLogEntity and saves it to the underlying SQL database cleanly.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.accesslog;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.AccessLogPort;

@Component
public class AccessLogAdapter implements AccessLogPort {
  private final AccessLogJpaRepository repository;

  public AccessLogAdapter(AccessLogJpaRepository repository) {
    this.repository = repository;
  }

  @Async
  @Override
  public void logAccess(Long userId) {
    if (userId == null) {
      return;
    }
    AccessLogEntity log = new AccessLogEntity();
    log.setUserId(userId);
    log.setCreatedAt(LocalDateTime.now(java.time.ZoneOffset.UTC));
    repository.save(log);
  }
}
