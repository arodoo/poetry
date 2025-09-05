/*
 * File: FontDtos.java
 * Purpose: Placeholder DTO container for module compliance.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

public class FontDtos {
  public record FontItem(String key, String label) { }

  public record CreateFontRequest(
	  String key,
	  String label,
	  String woff2Url,
	  java.util.List<Integer> weights,
	  String hash,
	  boolean preloadDefault,
	  String integrity) { }

  public record UpdateFontRequest(
	  String label,
	  String woff2Url,
	  java.util.List<Integer> weights,
	  boolean preloadDefault,
	  boolean active,
	  String integrity) { }

  public record FontResponse(
	  String key,
	  String label,
	  String woff2Url,
	  java.util.List<Integer> weights,
	  String hash,
	  boolean preloadDefault,
	  boolean active,
	  String integrity) { }
}
