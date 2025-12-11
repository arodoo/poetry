/*
 * File: RestoreFingerprintUseCaseTest.java
 * Purpose: Tests for RestoreFingerprintUseCase verifying archived fingerprint
 * restoration with hardware slot assignment and template upload.
 * All Rights Reserved. Arodi Emmanuel
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
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

class RestoreFingerprintUseCaseTest {

    @Mock
    private FingerprintCommandPort commandPort;
    @Mock
    private FingerprintQueryPort queryPort;
    @Mock
    private HardwareServicePort hardwarePort;

    private RestoreFingerprintUseCase useCase;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        useCase = new RestoreFingerprintUseCase(commandPort, queryPort, hardwarePort);
    }

    @Test
    void restoreArchivedFingerprintSucceeds() {
        Fingerprint archived = createArchivedFingerprint();
        when(queryPort.findById(1L)).thenReturn(Optional.of(archived));
        when(hardwarePort.findAvailableSlot()).thenReturn(100);
        when(hardwarePort.uploadTemplate(eq(100), any())).thenReturn(true);
        when(commandPort.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Fingerprint result = useCase.execute(1L);

        assertEquals(FingerprintStatus.ACTIVE, result.status());
        assertEquals(100, result.r503SlotId());
        verify(hardwarePort).uploadTemplate(eq(100), any());
    }

    @Test
    void restoreNonArchivedThrowsError() {
        Fingerprint active = createActiveFingerprint();
        when(queryPort.findById(1L)).thenReturn(Optional.of(active));

        assertThrows(IllegalStateException.class, () -> useCase.execute(1L));
    }

    private Fingerprint createArchivedFingerprint() {
        Instant now = Instant.now();
        return new Fingerprint(1L, 1L, null, new byte[] { 1, 2, 3 },
                FingerprintStatus.ARCHIVED, now, now, now, now, now, null, 1L);
    }

    private Fingerprint createActiveFingerprint() {
        Instant now = Instant.now();
        return new Fingerprint(1L, 1L, 50, null,
                FingerprintStatus.ACTIVE, now, null, now, now, now, null, 1L);
    }
}
