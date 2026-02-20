/*
 * File: AddressEmbeddable.java
 * Purpose: Embeddable address block for UserEntity.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class AddressEmbeddable {
  private String addressLine1;
  private String addressLine2;
  private String addressCity;
  private String addressState;
  private String addressZip;
  private String addressCountry;
}
