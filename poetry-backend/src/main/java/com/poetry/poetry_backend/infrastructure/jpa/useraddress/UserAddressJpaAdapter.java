/*
 * File: UserAddressJpaAdapter.java
 * Purpose: Implements both command and query ports for user address.
 * Upsert resolves an existing record by userId or creates a new one.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.useraddress;

import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.useraddress.port.UserAddressCommandPort;
import com.poetry.poetry_backend.application.useraddress.port.UserAddressQueryPort;
import com.poetry.poetry_backend.domain.useraddress.model.UserAddress;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

@Transactional
public class UserAddressJpaAdapter
    implements UserAddressCommandPort, UserAddressQueryPort {

  private final UserAddressJpaRepository repo;
  private final UserJpaRepository userRepo;

  public UserAddressJpaAdapter(
      UserAddressJpaRepository repo, UserJpaRepository userRepo) {
    this.repo = repo;
    this.userRepo = userRepo;
  }

  @Override
  public Optional<UserAddress> findByUserId(Long userId) {
    return repo.findByUserId(userId)
        .map(UserAddressJpaMapper::toDomain);
  }

  @Override
  public UserAddress upsert(
      Long userId,
      String line1, String line2,
      String city, String state,
      String zip, String country) {
    if (!userRepo.existsById(userId)) {
      throw new jakarta.persistence.EntityNotFoundException(
          "User " + userId + " not found");
    }
    UserAddressEntity e = repo.findByUserId(userId)
        .orElse(new UserAddressEntity());
    e.setUserId(userId);
    e.setLine1(line1);
    e.setLine2(line2);
    e.setCity(city);
    e.setState(state);
    e.setZip(zip);
    e.setCountry(country);
    return UserAddressJpaMapper.toDomain(repo.save(e));
  }
}
