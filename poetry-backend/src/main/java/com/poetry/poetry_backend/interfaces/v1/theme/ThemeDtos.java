/*
 * File: ThemeDtos.java
 * Purpose: DTOs for theme REST API requests and responses.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import java.util.Map;

public class ThemeDtos {
  public static class ThemeResponse {
    public Long id;
    public String name;
    public boolean active;
    public Map<String, String> colors;
  }
  public static class CreateRequest {
    public String name;
    public Map<String, String> colors;
  }
  public static class UpdateRequest {
    public String name;
    public Map<String, String> colors;
  }
}
