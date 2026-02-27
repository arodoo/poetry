/*
 * File: GetTodaysBirthdaysUseCase.java
 * Purpose: Application use case that retrieves users celebrating a
 * birthday today. Delegates entirely to the BirthdaysQueryPort, keeping
 * this class free of persistence or infrastructure concerns. Designed
 * for injection via DI composition and single-responsibility focus.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.birthdays.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.birthdays.port.BirthdaysQueryPort;
import com.poetry.poetry_backend.domain.birthdays.model.BirthdayUser;

public class GetTodaysBirthdaysUseCase {
  private final BirthdaysQueryPort port;

  public GetTodaysBirthdaysUseCase(BirthdaysQueryPort port) {
    this.port = port;
  }

  public List<BirthdayUser> execute() {
    return port.findTodaysBirthdays();
  }
}
