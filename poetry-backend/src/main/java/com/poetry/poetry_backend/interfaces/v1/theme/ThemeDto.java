/*
 * File: ThemeDto.java
 * Purpose: DTOs for theme REST API requests and responses.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import java.util.Map;

public class ThemeDto {
  public static class ThemeResponse {
    public Long id;
    public String key; // stable semantic key (e.g. "default", "dark")
    public String name;
    public boolean active;
    public Map<String, String> colors;
  }
  public static class CreateRequest {
    public String key; // stable semantic key (lowercase kebab)
    public String name;
    public Map<String, String> colors;
  }
  public static class UpdateRequest {
    public String name;
    public Map<String, String> colors;
  }
}
