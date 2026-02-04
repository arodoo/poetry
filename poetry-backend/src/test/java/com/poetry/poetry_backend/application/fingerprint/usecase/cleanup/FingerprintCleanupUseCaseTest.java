/*
 * File: FingerprintCleanupUseCaseTest.java
 * Purpose: Tests for FingerprintCleanupUseCase verifying inactive fingerprint archival.
 * All Rights Reserved Arodi Emmanuel
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

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

class FingerprintCleanupUseCaseTest {

    @Mock
    private FingerprintQueryPort queryPort;
    @Mock
    private FingerprintCommandPort commandPort;

    private FingerprintCleanupUseCase useCase;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        useCase = new FingerprintCleanupUseCase(queryPort, commandPort);
    }

    @Test
    void executeReturnsEmptyWhenNoInactiveFingerprints() {
        when(queryPort.findInactiveOlderThan(any(), anyInt())).thenReturn(List.of());

        FingerprintCleanupResult result = useCase.execute(Instant.now(), 50);

        assertEquals(0, result.archivedCount());
    }

    @Test
    void executeArchivesFingerprints() {
        Fingerprint fp = createActiveFingerprint(1L);
        when(queryPort.findInactiveOlderThan(any(), anyInt())).thenReturn(List.of(fp));
        when(commandPort.save(any())).thenAnswer(inv -> inv.getArgument(0));

        FingerprintCleanupResult result = useCase.execute(Instant.now(), 50);

        assertEquals(1, result.archivedCount());
        verify(commandPort).save(any());
    }

    private Fingerprint createActiveFingerprint(Long id) {
        Instant now = Instant.now();
        return new Fingerprint(id, 1L, "fmd-data",
                FingerprintStatus.ACTIVE, now, null, now, now, now, null, 1L);
    }
}
