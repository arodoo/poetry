/*
 * File: FingerprintComposition.java
 * Purpose: Composition root for Fingerprint enrollment use cases.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.fingerprint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintSlotHistoryCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.UserFingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.usecase.*;

@Configuration
public class FingerprintComposition {

  @Bean
  public EnrollFingerprintUseCase enrollFingerprintUseCase(
      FingerprintCommandPort cmd,
      FingerprintQueryPort qry,
      FingerprintSlotHistoryCommandPort historyCmd) {
    return new EnrollFingerprintUseCase(cmd, qry, historyCmd);
  }

  @Bean
  public CreateFingerprintUseCase createFingerprintUseCase(
      EnrollFingerprintUseCase enrollUseCase) {
    return new CreateFingerprintUseCase(enrollUseCase);
  }

  @Bean
  public EnrollFingerprintForUserUseCase enrollForUserUseCase(
      FingerprintCommandPort fpCmd,
      FingerprintQueryPort fpQry,
      FingerprintSlotHistoryCommandPort historyCmd,
      UserFingerprintCommandPort userFpCmd) {
    return new EnrollFingerprintForUserUseCase(
        fpCmd, fpQry, historyCmd, userFpCmd);
  }

  @Bean
  public ReserveSlotUseCase reserveSlotUseCase(FingerprintQueryPort fpQry) {
    return new ReserveSlotUseCase(fpQry);
  }

  @Bean
  public LinkFingerprintToUserUseCase linkFingerprintToUserUseCase(
      FingerprintCommandPort fpCmd,
      FingerprintSlotHistoryCommandPort historyCmd,
      UserFingerprintCommandPort userFpCmd) {
    return new LinkFingerprintToUserUseCase(fpCmd, historyCmd, userFpCmd);
  }
}
