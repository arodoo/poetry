/*
 * File: UserMembershipZonesEntity.java
 * Purpose: Junction table for user_has_membership to zones relationship.
 * Separate entity to keep UserHasMembershipEntity under line limit.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.membership;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_membership_zones")
@Getter
@Setter
public class UserMembershipZonesEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long membershipId;

  @Column(nullable = false)
  private Long zoneId;
}
