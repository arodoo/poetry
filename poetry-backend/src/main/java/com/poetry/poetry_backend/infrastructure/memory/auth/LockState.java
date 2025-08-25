/*
 * File: LockState.java
 * Purpose: Mutable per-identity lock state (failure counter and lock
 * expiry) extracted from InMemoryAccountLockoutAdapter to keep that
 * class below max line threshold. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

final class LockState { int failures; long lockUntil; }
