/*
 * File: RestoreResult.java
 * Purpose: Immutable record representing the result of a database
 * restore operation. Contains the count of tables restored and
 * a status message for the caller.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dbmanagement.model;

public record RestoreResult(
    int tablesRestored,
    String status) {
}
