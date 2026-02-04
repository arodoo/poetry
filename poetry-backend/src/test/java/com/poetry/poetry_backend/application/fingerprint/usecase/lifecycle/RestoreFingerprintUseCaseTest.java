/*
 * File: RestoreFingerprintUseCaseTest.java
 * Purpose: Tests for RestoreFingerprintUseCase verifying archived fingerprint restoration.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.Instant;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

class RestoreFingerprintUseCaseTest {

    @Mock
    private FingerprintCommandPort commandPort;
    @Mock
    private FingerprintQueryPort queryPort;

    private RestoreFingerprintUseCase useCase;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        useCase = new RestoreFingerprintUseCase(commandPort, queryPort);
    }

    @Test
    void restoreArchivedFingerprintSucceeds() {
        Fingerprint archived = createArchivedFingerprint();
        when(queryPort.findById(1L)).thenReturn(Optional.of(archived));
        when(commandPort.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Fingerprint result = useCase.execute(1L);

        assertEquals(FingerprintStatus.ACTIVE, result.status());
        verify(commandPort).save(any());
    }

    @Test
    void restoreNonArchivedThrowsError() {
        Fingerprint active = createActiveFingerprint();
        when(queryPort.findById(1L)).thenReturn(Optional.of(active));

        assertThrows(IllegalStateException.class, () -> useCase.execute(1L));
    }

    private Fingerprint createArchivedFingerprint() {
        Instant now = Instant.now();
        return new Fingerprint(1L, 1L, "fmd-data",
                FingerprintStatus.ARCHIVED, now, now, now, now, now, null, 1L);
    }

    private Fingerprint createActiveFingerprint() {
        Instant now = Instant.now();
        return new Fingerprint(1L, 1L, "fmd-data",
                FingerprintStatus.ACTIVE, now, null, now, now, now, null, 1L);
    }
}
