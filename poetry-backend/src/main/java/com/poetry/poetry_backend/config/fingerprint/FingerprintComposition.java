/*
 * File: FingerprintComposition.java
 * Purpose: Composition root for Fingerprint domain wiring all use cases with
 * command and query ports. Enables Spring dependency injection for clean
 * architecture enforcement.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.fingerprint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.usecase.*;

@Configuration
public class FingerprintComposition {

  @Bean
  public EnrollFingerprintUseCase enrollFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    return new EnrollFingerprintUseCase(commandPort, queryPort);
  }

  @Bean
  public VerifyFingerprintUseCase verifyFingerprintUseCase(
      FingerprintQueryPort queryPort) {
    return new VerifyFingerprintUseCase(queryPort);
  }

  @Bean
  public GetAllFingerprintsUseCase getAllFingerprintsUseCase(
      FingerprintQueryPort queryPort) {
    return new GetAllFingerprintsUseCase(queryPort);
  }

  @Bean
  public GetFingerprintByIdUseCase getFingerprintByIdUseCase(
      FingerprintQueryPort queryPort) {
    return new GetFingerprintByIdUseCase(queryPort);
  }

  @Bean
  public DeleteFingerprintUseCase deleteFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    return new DeleteFingerprintUseCase(commandPort, queryPort);
  }

  @Bean
  public CreateFingerprintUseCase createFingerprintUseCase(
      EnrollFingerprintUseCase enrollUseCase) {
    return new CreateFingerprintUseCase(enrollUseCase);
  }

  @Bean
  public UpdateFingerprintUseCase updateFingerprintUseCase() {
    return new UpdateFingerprintUseCase();
  }

  @Bean
  public ArchiveFingerprintUseCase archiveFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    return new ArchiveFingerprintUseCase(commandPort, queryPort);
  }

  @Bean
  public RestoreFingerprintUseCase restoreFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    return new RestoreFingerprintUseCase(commandPort, queryPort);
  }
}
