/*
 * File: SellerCodeQueryPort.java
 * Purpose: Define query operations for retrieving seller code data used by the
 * application layer. Abstracts read-only access ensuring use-cases remain
 * decoupled from storage details and can be tested with fake implementations.
 * Centralizes all read semantics for seller codes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.sellercode.port;

import java.util.List;

import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

public interface SellerCodeQueryPort {
  List<SellerCode> findAll();

  SellerCode findById(Long id);
}
