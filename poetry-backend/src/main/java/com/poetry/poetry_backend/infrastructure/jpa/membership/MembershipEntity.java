/*
 * File: MembershipEntity.java
 * Purpose: JPA entity for membership persistence. Maps domain attributes
 * to database columns and provides conversion helpers. Keeps persistence
 * concerns separate from domain models and business logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import java.time.Instant;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "memberships")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class MembershipEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @EqualsAndHashCode.Include
  @Column(nullable = false)
  private Long userId;

  @Column(nullable = false)
  private Long subscriptionId;

  @Column(nullable = false, length = 100)
  private String sellerCode;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(
      name = "membership_zones",
      joinColumns = @JoinColumn(name = "membership_id"))
  @Column(name = "zone_id")
  private Set<Long> zoneIds;

  @Column(nullable = false)
  private Boolean allZones = false;

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
