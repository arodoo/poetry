/*
 File: ETagSha256Adapter.java
 Purpose: Adapter implementing ETagPort using SHA-256 hashing for ETag
 generation. It encapsulates the algorithmic details behind a single API
 used by response advice and filters to produce stable resource validators.
 Keeping this adapter simple allows replacing hashing strategies without
 affecting the application layer contract.
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
