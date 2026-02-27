/*
 * File: UserDemographicsJpaRepository.java
 * Purpose: Spring Data repository for UserDemographicsEntity.
 * Primary lookup is by userId due to the 1:1 relationship.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.userdemographics;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDemographicsJpaRepository
    extends JpaRepository<UserDemographicsEntity, Long> {
  Optional<UserDemographicsEntity> findByUserId(Long userId);

  @Query("select d from UserDemographicsEntity d where " // i18n-ignore: JPQL
      + "month(d.birthDate) = ?1 and day(d.birthDate) = ?2 "
      + "and d.birthDate is not null") // i18n-ignore: JPQL
  List<UserDemographicsEntity> findByBirthMonthAndDay(int month, int day);
}
