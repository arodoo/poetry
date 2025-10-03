/*
 * File: SellerCodeJpaAdapter.java
 * Purpose: Main adapter delegating to query and command adapters providing
 * unified implementation of both query and command ports for seller codes
 * ensuring clean transaction boundaries and separation of concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.sellercode;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.application.sellercode.port.SellerCodeQueryPort;
import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;

@Transactional
public class SellerCodeJpaAdapter
    implements SellerCodeQueryPort, SellerCodeCommandPort {
  private final SellerCodeJpaQueryAdapter queryAdapter;
  private final SellerCodeJpaCommandAdapter commandAdapter;

  public SellerCodeJpaAdapter(SellerCodeJpaRepository repo) {
    this.queryAdapter = new SellerCodeJpaQueryAdapter(repo);
    this.commandAdapter = new SellerCodeJpaCommandAdapter(repo);
  }

  public List<SellerCode> findAll() {
    return queryAdapter.findAll();
  }

  public SellerCode findById(Long id) {
    return queryAdapter.findById(id);
  }

  public SellerCode create(
      String code, String organizationId, String status) {
    return commandAdapter.create(code, organizationId, status);
  }

  public SellerCode update(
      Long id,
      long version,
      String code,
      String organizationId,
      String status) {
    return commandAdapter.update(id, version, code, organizationId, status);
  }

  public void softDelete(Long id, long version) {
    commandAdapter.softDelete(id, version);
  }
}
