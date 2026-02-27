/*
 * File: BirthdaysController.java
 * Purpose: REST controller exposing GET /api/v1/birthdays/today for
 * admin users. Retrieves users celebrating a birthday on the current
 * UTC date and returns them as a JSON list. Delegates all business
 * logic to the application use case layer.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.birthdays;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.birthdays.usecase.GetTodaysBirthdaysUseCase;
import com.poetry.poetry_backend.interfaces.v1.birthdays.dto.BirthdayUserResponse;

@RestController
@RequestMapping("/api/v1/birthdays")
public class BirthdaysController {
  private final GetTodaysBirthdaysUseCase useCase;

  public BirthdaysController(GetTodaysBirthdaysUseCase useCase) {
    this.useCase = useCase;
  }

  @GetMapping("/today")
  @PreAuthorize("hasAuthority('admin')") // i18n-ignore: Spring Security
  public ResponseEntity<List<BirthdayUserResponse>> today() {
    List<BirthdayUserResponse> response = useCase.execute()
        .stream()
        .map(BirthdayUserResponse::fromDomain)
        .toList();
    return ResponseEntity.ok(response);
  }
}
