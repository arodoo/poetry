/*
 File: ETagPort.java
 Purpose: Abstraction to compute ETag values from canonical payloads. It
   defines a single operation that takes a normalized representation and
   returns a deterministic tag. Implementations choose the hashing
   strategy so callers stay decoupled from cryptographic details.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.common.port;

public interface ETagPort {
  String compute(String canonical);
}
