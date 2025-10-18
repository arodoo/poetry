/*
 * File: I18nDto.java
 * Purpose: DTO records for i18n endpoints responses. This class contains
 * the data transfer objects used for API responses in the i18n module.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.i18n;

import java.util.List;

public final class I18nDto {
  private I18nDto() { }
  public record LocalesResponse(List<String> locales) { }
}
