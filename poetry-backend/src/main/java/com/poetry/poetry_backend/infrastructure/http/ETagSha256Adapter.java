/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.http;

import com.poetry.poetry_backend.application.common.port.ETagPort;

public class ETagSha256Adapter implements ETagPort {
  @Override
  public String compute(String canonical) {
    return ETagUtil.compute(canonical);
  }
}
