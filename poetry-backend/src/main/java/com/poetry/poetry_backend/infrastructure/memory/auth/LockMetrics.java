/*
 * File: LockMetrics.java
 * Purpose: Holds counters for in-memory account lockout to keep
 * adapter concise while exposing totals for observability and future
 * Micrometer integration without increasing file size. It isolates
 * state mutation for lock and failure events enabling potential future
 * thread safety enhancements without touching adapter logic.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

final class LockMetrics {
    private long locks;
    private long failures;

    void lock() { locks++; }

    void fail() { failures++; }

    long getLocks() { return locks; }

    long getFailures() { return failures; }
}
