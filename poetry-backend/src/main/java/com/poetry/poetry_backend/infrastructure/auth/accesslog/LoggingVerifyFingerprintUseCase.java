/*
 * File: LoggingVerifyFingerprintUseCase.java
 * Purpose: Decorator implementation for VerifyFingerprintUseCase that intercepts successful physical fingerprint matches to generate parallel access log records using the AccessLogPort, without polluting the core verification logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.auth.accesslog;

import com.poetry.poetry_backend.application.fingerprint.port.AccessLogPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;
import com.poetry.poetry_backend.application.fingerprint.usecase.VerifyFingerprintResult;
import com.poetry.poetry_backend.application.fingerprint.usecase.VerifyFingerprintUseCase;

public class LoggingVerifyFingerprintUseCase extends VerifyFingerprintUseCase {
  private final AccessLogPort accessLogPort;

  public LoggingVerifyFingerprintUseCase(
      FingerprintQueryPort queryPort,
      HidCapturePort capturePort,
      AccessLogPort accessLogPort) {
    super(queryPort, capturePort);
    this.accessLogPort = accessLogPort;
  }

  @Override
  public VerifyFingerprintResult execute(String fmd) {
    VerifyFingerprintResult result = super.execute(fmd);
    if (result.matched() && result.userId() != null) {
      accessLogPort.logAccess(result.userId());
    }
    return result;
  }
}
