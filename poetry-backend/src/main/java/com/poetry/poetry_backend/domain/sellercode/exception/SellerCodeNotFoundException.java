/*
 * File: SellerCodeNotFoundException.java
 * Purpose: Domain exception for missing SellerCode aggregate using shared
 * not-found base. Thrown when seller code lookup fails providing consistent
 * error handling across application and interface layers.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.sellercode.exception;

import com.poetry.poetry_backend.domain.shared.exception.AbstractNotFoundException;

public class SellerCodeNotFoundException extends AbstractNotFoundException {
  public SellerCodeNotFoundException(Long id) {
    super("sellercode", String.valueOf(id), "Seller code not found: " + id);
  }
}
