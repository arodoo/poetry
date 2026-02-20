/*
 * File: UserAddressComposition.java
 * Purpose: Wires UserAddress ports, adapter, and use cases as beans.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.useraddress;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.useraddress.port.UserAddressCommandPort;
import com.poetry.poetry_backend.application.useraddress.port.UserAddressQueryPort;
import com.poetry.poetry_backend.application.useraddress.usecase.GetUserAddressUseCase;
import com.poetry.poetry_backend.application.useraddress.usecase.UpsertUserAddressUseCase;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.useraddress.UserAddressJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.useraddress.UserAddressJpaRepository;

@Configuration
public class UserAddressComposition {
  @Bean
  UserAddressJpaAdapter userAddressJpaAdapter(
      UserAddressJpaRepository repo, UserJpaRepository userRepo) {
    return new UserAddressJpaAdapter(repo, userRepo);
  }

  @Bean
  UpsertUserAddressUseCase upsertUserAddressUseCase(
      UserAddressCommandPort c) {
    return new UpsertUserAddressUseCase(c);
  }

  @Bean
  GetUserAddressUseCase getUserAddressUseCase(
      UserAddressQueryPort q) {
    return new GetUserAddressUseCase(q);
  }
}
