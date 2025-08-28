/*
 * File: SetUserLocaleCommand.java
 * Purpose: Command DTO representing intent to set or change a user's
 * locale preference. Validated at application boundary. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.locale;

public record SetUserLocaleCommand(String userId, String locale) { }
