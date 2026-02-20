/*
 * File: UserDemographicsJpaAdapter.java
 * Purpose: Implements both command and query ports for user demographics.
 * Upsert resolves an existing record by userId or creates a new one.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.userdemographics;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.userdemographics.port.UserDemographicsCommandPort;
import com.poetry.poetry_backend.application.userdemographics.port.UserDemographicsQueryPort;
import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographics;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

@Transactional
public class UserDemographicsJpaAdapter
    implements UserDemographicsCommandPort, UserDemographicsQueryPort {

  private final UserDemographicsJpaRepository repo;
  private final UserJpaRepository userRepo;

  public UserDemographicsJpaAdapter(
      UserDemographicsJpaRepository repo, UserJpaRepository userRepo) {
    this.repo = repo;
    this.userRepo = userRepo;
  }

  @Override
  public Optional<UserDemographics> findByUserId(Long userId) {
    return repo.findByUserId(userId)
        .map(UserDemographicsJpaMapper::toDomain);
  }

  @Override
  public UserDemographics upsert(
      Long userId, LocalDate birthDate, String gender, String phone) {
    if (!userRepo.existsById(userId)) {
      throw new jakarta.persistence.EntityNotFoundException(
          "User " + userId + " not found");
    }
    UserDemographicsEntity e = repo.findByUserId(userId)
        .orElse(new UserDemographicsEntity());
    e.setUserId(userId);
    e.setBirthDate(birthDate);
    e.setGender(gender);
    e.setPhone(phone);
    return UserDemographicsJpaMapper.toDomain(repo.save(e));
  }
}
