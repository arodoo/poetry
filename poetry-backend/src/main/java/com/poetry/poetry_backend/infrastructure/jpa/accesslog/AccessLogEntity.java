/*
 * File: AccessLogEntity.java
 * Purpose: JPA Entity for mapping physical access logs into the database. Records the exact time a user successfully authenticated via the fingerprint scanner, allowing the generation of accurate dashboards and metrics without modifying the core domain use cases.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.accesslog;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "access_logs")
@Getter
@Setter
public class AccessLogEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, name = "user_id")
  private Long userId;

  @Column(nullable = false, name = "created_at")
  private LocalDateTime createdAt;
}
