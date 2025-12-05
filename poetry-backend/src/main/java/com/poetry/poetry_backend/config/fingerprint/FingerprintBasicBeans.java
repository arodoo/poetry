/*
 * File: FingerprintBasicBeans.java
 * Purpose: Basic fingerprint use case beans (CRUD operations).
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.fingerprint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.usecase.VerifyFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle.ArchiveFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle.DeleteFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle.RestoreFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle.UpdateFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.query.GetAllFingerprintsUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.query.GetFingerprintByIdUseCase;

@Configuration
public class FingerprintBasicBeans {

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
      FingerprintCommandPort cmd, FingerprintQueryPort qry) {
    return new DeleteFingerprintUseCase(cmd, qry);
  }

  @Bean
  public UpdateFingerprintUseCase updateFingerprintUseCase() {
    return new UpdateFingerprintUseCase();
  }

  @Bean
  public ArchiveFingerprintUseCase archiveFingerprintUseCase(
      FingerprintCommandPort cmd, FingerprintQueryPort qry) {
    return new ArchiveFingerprintUseCase(cmd, qry);
  }

  @Bean
  public RestoreFingerprintUseCase restoreFingerprintUseCase(
      FingerprintCommandPort cmd, FingerprintQueryPort qry) {
    return new RestoreFingerprintUseCase(cmd, qry);
  }

  @Bean
  public VerifyFingerprintUseCase verifyFingerprintUseCase(
      FingerprintQueryPort queryPort) {
    return new VerifyFingerprintUseCase(queryPort);
  }
}
