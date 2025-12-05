/*
 * File: JsonHelper.java
 * Purpose: Small utility wrapper around ObjectMapper centralizing JSON
 * serialization for registration idempotency support to avoid code
 * duplication and keep related files within size constraints. It shields
 * higher level classes from direct mapper dependency and simplifies
 * future customization like filtering or encryption of payload fields.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public final class JsonHelper {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private JsonHelper() {
    }

    public static String write(Map<String, Object> map) {
        try {
            return MAPPER.writeValueAsString(map);
        } catch (JsonProcessingException e) {
            return "{}";
        }
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Object> readMap(String json) {
        try {
            return MAPPER.readValue(json, Map.class);
        } catch (Exception e) {
            throw new IllegalStateException("parse");
        }
    }
}
