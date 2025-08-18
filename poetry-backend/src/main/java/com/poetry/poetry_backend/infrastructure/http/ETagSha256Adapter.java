/*
 Infrastructure adapter that implements ETagPort via a SHA‑256 digest of
 a canonical representation. It delegates hashing to ETagUtil to centralize
 the algorithm. This keeps HTTP concerns outside application code while
 remaining deterministic across nodes. All Rights Reserved. Arodi
 Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.http;

import com.poetry.poetry_backend.application.common.port.ETagPort;

public class ETagSha256Adapter implements ETagPort {
  @Override
  public String compute(String canonical) {
    return ETagUtil.compute(canonical);
  }
}
