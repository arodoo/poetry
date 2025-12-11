/*
 * File: FingerprintCleanupUseCase.java
 * Purpose: Archives inactive fingerprints to free R503 slots.
 * Finds fingerprints with no activity past threshold, archives records,
 * then calls hardware service to delete templates from R503 device.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.cleanup;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.poetry.poetry_backend.application.fingerprint.port.BatchDeleteResult;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.lifecycle.FingerprintArchiver;

public class FingerprintCleanupUseCase {
    private final FingerprintQueryPort queryPort;
    private final FingerprintCommandPort commandPort;
    private final HardwareServicePort hardwarePort;

    public FingerprintCleanupUseCase(
            FingerprintQueryPort queryPort,
            FingerprintCommandPort commandPort,
            HardwareServicePort hardwarePort) {
        this.queryPort = queryPort;
        this.commandPort = commandPort;
        this.hardwarePort = hardwarePort;
    }

    public FingerprintCleanupResult execute(Instant cutoff, int batchSize) {
        List<Fingerprint> stale = queryPort.findInactiveOlderThan(cutoff, batchSize);
        List<Integer> archivedSlots = archiveFingerprints(stale);

        if (archivedSlots.isEmpty()) {
            return FingerprintCleanupResult.withoutHardware(0, List.of());
        }

        BatchDeleteResult hwResult = hardwarePort.deleteTemplates(archivedSlots);

        return FingerprintCleanupResult.withHardware(
                archivedSlots.size(),
                archivedSlots,
                hwResult.allSucceeded(),
                hwResult.failedSlots());
    }

    private List<Integer> archiveFingerprints(List<Fingerprint> fingerprints) {
        List<Integer> slots = new ArrayList<>();
        for (Fingerprint fp : fingerprints) {
            if (fp.r503SlotId() == null)
                continue;

            byte[] backup = fp.templateBackup() != null ? fp.templateBackup() : new byte[0];
            Fingerprint archived = FingerprintArchiver.markArchived(fp, backup);
            commandPort.save(archived);
            slots.add(fp.r503SlotId());
        }
        return slots;
    }
}
