/*
 * File: BirthdaysJpaAdapter.java
 * Purpose: JPA implementation of BirthdaysQueryPort. Queries the
 * user_demographics table for today's birth month and day using
 * the system default timezone (not UTC) so birthdays match the
 * local date where the server runs. Builds lean BirthdayUser
 * records from active users, handling null names gracefully.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.birthdays;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.birthdays.port.BirthdaysQueryPort;
import com.poetry.poetry_backend.domain.birthdays.model.BirthdayUser;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.userdemographics.UserDemographicsJpaRepository;

@Transactional(readOnly = true)
public class BirthdaysJpaAdapter implements BirthdaysQueryPort {
  private final UserDemographicsJpaRepository demographicsRepo;
  private final UserJpaRepository userRepo;

  public BirthdaysJpaAdapter(
      UserDemographicsJpaRepository demographicsRepo,
      UserJpaRepository userRepo) {
    this.demographicsRepo = demographicsRepo;
    this.userRepo = userRepo;
  }

  @Override
  public List<BirthdayUser> findTodaysBirthdays() {
    LocalDate today = LocalDate.now(ZoneId.systemDefault());
    return demographicsRepo
        .findByBirthMonthAndDay(
            today.getMonthValue(), today.getDayOfMonth())
        .stream()
        .flatMap(d -> userRepo.findActiveById(d.getUserId()).stream())
        .map(u -> new BirthdayUser(fullName(u), u.getUsername()))
        .toList();
  }

  private String fullName(UserEntity u) {
    String first = u.getFirstName() != null ? u.getFirstName() : "";
    String last = u.getLastName() != null ? u.getLastName() : "";
    String full = (first + " " + last).trim();
    return full.isEmpty() ? u.getUsername() : full;
  }
}
