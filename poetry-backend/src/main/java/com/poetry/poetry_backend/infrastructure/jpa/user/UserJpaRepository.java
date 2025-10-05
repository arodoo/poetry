/*
 File: UserJpaRepository.java
 Purpose: Repository interface for user persistence used by the JPA
 adapter. It defines CRUD operations required by the application ports
 while keeping actual JPA implementation details hidden inside
 infrastructure. Extended with username lookup helpers for auth.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserJpaRepository extends JpaRepository<UserEntity, Long> {
  @Query("select u from UserEntity u where u.active = true") // i18n-ignore: JPQL
  List<UserEntity> findAllActive();

  @Query("select u from UserEntity u where u.active = true") // i18n-ignore: JPQL
  Page<UserEntity> findAllActive(Pageable pageable);
  
  @Query(
      "select u from UserEntity u where u.active = true and "
          + "(lower(u.email) like lower(concat('%', :search, '%')) or "
          + "lower(u.username) like lower(concat('%', :search, '%')))") // i18n-ignore: JPQL
  Page<UserEntity> searchActive(String search, Pageable pageable);
  
  // i18n-ignore: JPQL query, not user-facing  
  @Query("select u from UserEntity u where u.id = :id and u.active = true") 
  Optional<UserEntity> findActiveById(Long id);
  
  // i18n-ignore: JPQL query, not user-facing
  @Query("select u from UserEntity u where u.username = :u and u.active = true") 
  Optional<UserEntity> findActiveByUsername(String u);
  
  boolean existsByUsername(String username);
  boolean existsByEmail(String email);
}
