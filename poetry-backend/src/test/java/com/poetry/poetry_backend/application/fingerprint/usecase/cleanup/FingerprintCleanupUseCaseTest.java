/*
 * File: FingerprintCleanupUseCaseTest.java
 * Purpose: Tests for FingerprintCleanupUseCase verifying inactive fingerprint
 * archival, slot ID collection, and hardware deletion integration.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.cleanup;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.Instant;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.poetry.poetry_backend.application.fingerprint.port.BatchDeleteResult;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

class FingerprintCleanupUseCaseTest {

    @Mock
    private FingerprintQueryPort queryPort;
    @Mock
    private FingerprintCommandPort commandPort;
    @Mock
    private HardwareServicePort hardwarePort;

    private FingerprintCleanupUseCase useCase;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        useCase = new FingerprintCleanupUseCase(queryPort, commandPort, hardwarePort);
    }

    @Test
    void executeReturnsEmptyWhenNoInactiveFingerprints() {
        when(queryPort.findInactiveOlderThan(any(), anyInt())).thenReturn(List.of());

        FingerprintCleanupResult result = useCase.execute(Instant.now(), 50);

        assertEquals(0, result.archivedCount());
        assertTrue(result.slotIdsToDelete().isEmpty());
        verifyNoInteractions(hardwarePort);
    }

    @Test
    void executeArchivesAndCallsHardwareDelete() {
        Fingerprint fp = createActiveFingerprint(1L, 42);
        when(queryPort.findInactiveOlderThan(any(), anyInt())).thenReturn(List.of(fp));
        when(commandPort.save(any())).thenAnswer(inv -> inv.getArgument(0));
        when(hardwarePort.deleteTemplates(List.of(42)))
                .thenReturn(BatchDeleteResult.success(1));

        FingerprintCleanupResult result = useCase.execute(Instant.now(), 50);

        assertEquals(1, result.archivedCount());
        assertTrue(result.slotIdsToDelete().contains(42));
        verify(hardwarePort).deleteTemplates(List.of(42));
    }

    private Fingerprint createActiveFingerprint(Long id, Integer slotId) {
        Instant now = Instant.now();
        return new Fingerprint(id, 1L, slotId, null,
                FingerprintStatus.ACTIVE, now, null, now, now, now, null, 1L);
    }
}
