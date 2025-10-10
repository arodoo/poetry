/*
 * File: SubscriptionEntity.java
 * Purpose: JPA entity for subscription plan persistence. Maps domain
 * attributes to database columns and provides conversion helpers. Keeps
 * persistence concerns separate from domain models and business logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.subscription;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "subscriptions", indexes = {
    @Index(name = "idx_sub_name", columnList = "name", unique = true)})
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SubscriptionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @EqualsAndHashCode.Include
  @Column(nullable = false, unique = true, length = 100)
  private String name;

  @Column(length = 500)
  private String description;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal price;

  @Column(nullable = false, length = 3)
  private String currency = "USD";

  @Column(nullable = false)
  private Integer durationDays;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(
      name = "subscription_features",
      joinColumns = @JoinColumn(name = "subscription_id"))
  @Column(name = "feature")
  private Set<String> features;

  @Column(nullable = false, length = 20)
  private String status = "active";

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Instant updatedAt;

  private Instant deletedAt;

  @Version
  private Long version;
}
