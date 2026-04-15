/*
 * File: UpdateUserUseCaseTest.java
 * Purpose: Tests for UpdateUserUseCase: cascade on inactive,
 * no cascade on active status.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Collections;
import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.fingerprint.port.*;
import com.poetry.poetry_backend.application.membership.port.MembershipCommandPort;
import com.poetry.poetry_backend.application.sellercode.port.SellerCodeCommandPort;
import com.poetry.poetry_backend.application.user.port.*;
import com.poetry.poetry_backend.application.user.service.UserCascadeService;
import com.poetry.poetry_backend.domain.user.model.core.User;

class UpdateUserUseCaseTest {
  private UserCascadeService cascade(MembershipCommandPort mc,
      SellerCodeCommandPort sc, UserDemographicsCommandPort dc) {
    var fq = mock(FingerprintQueryPort.class);
    when(fq.findByUserId(any())).thenReturn(Collections.emptyList());
    return new UserCascadeService(fq, mock(FingerprintCommandPort.class), mc, sc, dc);
  }

  private UserCommandPort cmd(String st) {
    var c = mock(UserCommandPort.class);
    when(c.update(anyLong(), anyLong(), any(), any(), any(), any(), any(), any()))
        .thenAnswer(i -> new User(i.getArgument(0),
            "N", "L", "e", "u", "en", st, Set.of("R"), null, null, null, 1L));
    return c;
  }

  @Test void cascadesOnInactive() {
    var mc = mock(MembershipCommandPort.class);
    var dc = mock(UserDemographicsCommandPort.class);
    var uc = new UpdateUserUseCase(cmd("inactive"),
        cascade(mc, mock(SellerCodeCommandPort.class), dc));
    var u = uc.execute(7L, 1L, "N", "L", "e", "en", Set.of("R"), "inactive");
    assertEquals("inactive", u.status());
    verify(mc).softDeleteByUserId(7L);
    verify(dc).deleteByUserId(7L);
  }

  @Test void noCascadeOnActive() {
    var mc = mock(MembershipCommandPort.class);
    var uc = new UpdateUserUseCase(cmd("active"),
        cascade(mc, mock(SellerCodeCommandPort.class), mock(UserDemographicsCommandPort.class)));
    uc.execute(7L, 1L, "N", "L", "e", "en", Set.of("R"), "active");
    verify(mc, never()).softDeleteByUserId(anyLong());
  }
}
