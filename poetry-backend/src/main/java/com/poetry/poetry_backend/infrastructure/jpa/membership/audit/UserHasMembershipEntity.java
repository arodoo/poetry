/*
 * File: UserHasMembershipEntity.java
 * Purpose: JPA entity tracking user membership assignments over time.
 * Each record represents a period when a user had an active subscription.
 * Preserves full audit history of all memberships per user.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.membership.audit;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeEntity;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_has_membership")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserHasMembershipEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @EqualsAndHashCode.Include
  @Column(nullable = false)
  private Long userId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "userId", insertable = false, updatable = false)
  private UserEntity user;

  @Column(nullable = false)
  private Long subscriptionId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "subscriptionId", insertable = false, updatable = false)
  private SubscriptionEntity subscription;

  @Column(nullable = false, length = 100)
  private String sellerCode;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "sellerCode", referencedColumnName = "code", insertable = false, updatable = false)
  private SellerCodeEntity sellerInfo;

  @Column(nullable = false)
  private Instant startDate;

  @Column(nullable = false)
  private Instant endDate;

  @Column(nullable = false, length = 20)
  private String status = "active";

  @CreationTimestamp
  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(nullable = false)
  private Instant updatedAt;

  @Column(nullable = false, columnDefinition = "boolean default false")
  private Boolean allZones = false;

  @Version
  private Long version;
}
