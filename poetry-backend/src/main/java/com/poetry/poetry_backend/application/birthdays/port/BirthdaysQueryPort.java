/*
 * File: BirthdaysQueryPort.java
 * Purpose: Outbound port for querying today's birthday users. Defines
 * the contract that infrastructure must satisfy so the application layer
 * stays decoupled from persistence details. Implementations live in the
 * infrastructure layer and are wired via DI composition.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.birthdays.port;

import java.util.List;

import com.poetry.poetry_backend.domain.birthdays.model.BirthdayUser;

public interface BirthdaysQueryPort {
  List<BirthdayUser> findTodaysBirthdays();
}
