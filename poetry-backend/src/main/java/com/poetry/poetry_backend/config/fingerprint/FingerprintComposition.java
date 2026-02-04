/*
 * File: FingerprintComposition.java
 * Purpose: Composition root for Fingerprint enrollment use cases.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.fingerprint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.EnrollFingerprintForUserUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.EnrollFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.LinkFingerprintToUserUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle.CreateFingerprintUseCase;

@Configuration
public class FingerprintComposition {

  @Bean
  public EnrollFingerprintUseCase enrollFingerprintUseCase(
      FingerprintCommandPort cmd) {
    return new EnrollFingerprintUseCase(cmd);
  }

  @Bean
  public CreateFingerprintUseCase createFingerprintUseCase(
      EnrollFingerprintUseCase enrollUseCase) {
    return new CreateFingerprintUseCase(enrollUseCase);
  }

  @Bean
  public EnrollFingerprintForUserUseCase enrollForUserUseCase(
      FingerprintCommandPort fpCmd,
      UserFingerprintCommandPort userFpCmd) {
    return new EnrollFingerprintForUserUseCase(fpCmd, userFpCmd);
  }

  @Bean
  public LinkFingerprintToUserUseCase linkFingerprintToUserUseCase(
      FingerprintCommandPort fpCmd,
      UserFingerprintCommandPort userFpCmd) {
    return new LinkFingerprintToUserUseCase(fpCmd, userFpCmd);
  }
}
