/*
 * File: SortParser.java
 * Purpose: Parses "field,direction" sort strings
 * from REST params into Spring Sort objects.
 * Validates field names against a whitelist to
 * prevent injection. Returns unsorted for invalid.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.util.Set;

import org.springframework.data.domain.Sort;

public final class SortParser {

    private SortParser() {
    }

    public static Sort parse(
            String sort, Set<String> allowed) {
        if (sort == null || sort.isBlank()) {
            return Sort.unsorted();
        }
        String[] parts = sort.split(",", 2);
        String field = parts[0].trim();
        if (!allowed.contains(field)) {
            return Sort.unsorted();
        }
        Sort.Direction dir = Sort.Direction.ASC;
        if (parts.length > 1) {
            String raw = parts[1].trim().toLowerCase();
            if ("desc".equals(raw)) {
                dir = Sort.Direction.DESC;
            }
        }
        return Sort.by(dir, field);
    }
}
