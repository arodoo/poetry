/*
 * File: TableInfo.java
 * Purpose: Immutable record representing database table metadata.
 * Contains table name and row count for listing available tables
 * in the database management feature.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.dbmanagement.model;

public record TableInfo(String name, long rowCount) {
}
