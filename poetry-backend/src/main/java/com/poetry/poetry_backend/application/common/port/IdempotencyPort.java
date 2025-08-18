/*
 File: IdempotencyPort.java
 Purpose: Defines a contract to register idempotency keys for mutating
   requests. Implementations must ensure conflict detection across
   retries, enabling safe POST/PUT/DELETE semantics.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.common.port;

public interface IdempotencyPort {
  boolean register(String key);
}
