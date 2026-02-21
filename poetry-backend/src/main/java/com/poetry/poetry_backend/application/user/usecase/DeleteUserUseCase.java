/*
 * File: DeleteUserUseCase.java
 * Purpose: Encapsulate the logic to soft-delete users by delegating to command
 * ports and ensuring domain rules (such as permissions and audit) are
 * respected. Cascades soft-deletion to all fingerprints owned by the user
 * so biometric data does not remain active after account removal.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.usecase;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.user.port.UserCommandPort;

public class DeleteUserUseCase {
  private final UserCommandPort commands;
  private final FingerprintQueryPort fingerprintQuery;
  private final FingerprintCommandPort fingerprintCommand;

  public DeleteUserUseCase(
      UserCommandPort commands,
      FingerprintQueryPort fingerprintQuery,
      FingerprintCommandPort fingerprintCommand) {
    this.commands = commands;
    this.fingerprintQuery = fingerprintQuery;
    this.fingerprintCommand = fingerprintCommand;
  }

  public void execute(Long id, long version) {
    commands.softDelete(id, version);
    fingerprintQuery.findByUserId(id)
        .forEach(fp -> fingerprintCommand.deleteById(fp.id()));
  }
}
