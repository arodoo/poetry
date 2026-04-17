/*
 * File: BirthdaysJpaAdapterZoneTest.java
 * Purpose: Unit test proving BirthdaysJpaAdapter uses the injected
 * ZoneId when deciding "today" rather than the JVM default zone. This
 * guards against the client-site bug where a Windows JVM with a
 * different default zone returned empty birthdays. Uses Mockito stubs
 * so no Spring context or database is required.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.birthdays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.userdemographics.UserDemographicsEntity;
import com.poetry.poetry_backend.infrastructure.jpa.userdemographics.UserDemographicsJpaRepository;

class BirthdaysJpaAdapterZoneTest {
  @Test
  void queriesUsingInjectedZone() {
    var demoRepo = mock(UserDemographicsJpaRepository.class);
    var userRepo = mock(UserJpaRepository.class);
    ZoneId tz = ZoneId.of("Pacific/Kiritimati");
    LocalDate today = LocalDate.now(tz);
    var demo = new UserDemographicsEntity();
    demo.setUserId(7L);
    when(demoRepo.findByBirthMonthAndDay(
        today.getMonthValue(), today.getDayOfMonth()))
            .thenReturn(List.of(demo));
    var user = new UserEntity();
    user.setUsername("alice");
    when(userRepo.findActiveById(7L)).thenReturn(Optional.of(user));

    var adapter = new BirthdaysJpaAdapter(demoRepo, userRepo, tz);
    var out = adapter.findTodaysBirthdays();

    assertEquals(1, out.size());
    assertEquals("alice", out.get(0).username());
    verify(demoRepo).findByBirthMonthAndDay(
        today.getMonthValue(), today.getDayOfMonth());
  }
}
