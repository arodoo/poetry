/*
 * File: UserCascadeService.java
 * Purpose: Encapsulates the cascade cleanup logic for user
 * deactivation. Soft-deletes fingerprints, memberships, seller
 * codes, and demographics belonging to a given userId. Reusable
 * by both DeleteUserUseCase and UpdateUserUseCase when a user
 * is set to inactive.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.service;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.application.user.port.UserDemographicsCommandPort;

public class UserCascadeService {
  private final FingerprintQueryPort fpQuery;
  private final FingerprintCommandPort fpCommand;
  private final MembershipCommandPort membershipCmd;
  private final SellerCodeCommandPort sellerCodeCmd;
  private final UserDemographicsCommandPort demographicsCmd;

  public UserCascadeService(
      FingerprintQueryPort fpQuery,
      FingerprintCommandPort fpCommand,
      MembershipCommandPort membershipCmd,
      SellerCodeCommandPort sellerCodeCmd,
      UserDemographicsCommandPort demographicsCmd) {
    this.fpQuery = fpQuery;
    this.fpCommand = fpCommand;
    this.membershipCmd = membershipCmd;
    this.sellerCodeCmd = sellerCodeCmd;
    this.demographicsCmd = demographicsCmd;
  }

  public void cascadeDeactivate(Long userId) {
    fpQuery.findByUserId(userId)
        .forEach(fp -> fpCommand.deleteById(fp.id()));
    membershipCmd.softDeleteByUserId(userId);
    sellerCodeCmd.softDeleteByUserId(userId);
    demographicsCmd.deleteByUserId(userId);
  }
}
