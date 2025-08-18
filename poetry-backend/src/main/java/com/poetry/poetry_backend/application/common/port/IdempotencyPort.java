/*
 File: IdempotencyPort.java
 Purpose: Application port to register and check Idempotency-Key usage.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.common.port;

public interface IdempotencyPort {
    boolean register(String key);
}
