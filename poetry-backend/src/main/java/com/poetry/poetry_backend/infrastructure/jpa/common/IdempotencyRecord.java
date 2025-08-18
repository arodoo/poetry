/*
 JPA entity that stores a single idempotency key per processed request.
 The table enforces a unique constraint on keyValue to guarantee that a
 given request is accepted at most once. Only the minimal fields are
 modeled to keep the concern isolated in infrastructure. All Rights
 Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.jpa.common;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "idempotency_records")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class IdempotencyRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @EqualsAndHashCode.Include
  @Column(unique = true, nullable = false, length = 128)
  private String keyValue;
}
