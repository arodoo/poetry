/*
 * File: AdaptiveWindow.java
 * Purpose: Holds mutable state (nearHits and penalty expiry) for the
 * adaptive rate limiter per key. Extracted to satisfy max lines rule
 * in main adapter without altering behavior. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

final class AdaptiveWindow { int nearHits; long penaltyUntil; }
