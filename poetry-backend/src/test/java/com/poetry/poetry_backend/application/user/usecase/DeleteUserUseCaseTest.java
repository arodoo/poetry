/*
 * File: DeleteUserUseCaseTest.java
 * Purpose: Unit test for DeleteUserUseCase verifying soft-delete
 * and cascade via UserCascadeService.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Collections;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.fingerprint.port.*;
import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.application.user.port.*;
import com.poetry.poetry_backend.application.user.service.UserCascadeService;

class DeleteUserUseCaseTest {
  @Test
  void deletesUserAndCascades() {
    final long[] deleted = {0};
    UserCommandPort cmd = mock(UserCommandPort.class);
    doAnswer(inv -> { deleted[0] = inv.getArgument(0); return null; })
        .when(cmd).softDelete(anyLong(), anyLong());
    var fq = mock(FingerprintQueryPort.class);
    when(fq.findByUserId(any())).thenReturn(Collections.emptyList());
    var mc = mock(MembershipCommandPort.class);
    var sc = mock(SellerCodeCommandPort.class);
    var dc = mock(UserDemographicsCommandPort.class);
    var cascade = new UserCascadeService(
        fq, mock(FingerprintCommandPort.class), mc, sc, dc);
    var uc = new DeleteUserUseCase(cmd, cascade);
    uc.execute(11L, 1L);
    assertEquals(11L, deleted[0]);
    verify(mc).softDeleteByUserId(11L);
    verify(sc).softDeleteByUserId(11L);
    verify(dc).deleteByUserId(11L);
  }
}
