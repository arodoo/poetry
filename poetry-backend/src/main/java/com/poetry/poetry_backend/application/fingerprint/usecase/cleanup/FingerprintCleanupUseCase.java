/*
 * File: FingerprintCleanupUseCase.java
 * Purpose: Archives inactive fingerprints to free R503 slots.
 * Finds fingerprints with no activity past threshold, downloads
 * template, archives record, returns slot IDs to delete from device.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.cleanup;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.lifecycle.FingerprintArchiver;

public class FingerprintCleanupUseCase {
    private final FingerprintQueryPort queryPort;
    private final FingerprintCommandPort commandPort;

    public FingerprintCleanupUseCase(
            FingerprintQueryPort queryPort, FingerprintCommandPort commandPort) {
        this.queryPort = queryPort;
        this.commandPort = commandPort;
    }

    public FingerprintCleanupResult execute(Instant cutoff, int batchSize) {
        List<Fingerprint> stale = queryPort.findInactiveOlderThan(cutoff, batchSize);
        List<Integer> archivedSlots = new ArrayList<>();

        for (Fingerprint fp : stale) {
            if (fp.r503SlotId() == null)
                continue;

            byte[] backup = fp.templateBackup() != null
                    ? fp.templateBackup()
                    : new byte[0];

            Fingerprint archived = FingerprintArchiver.markArchived(fp, backup);
            commandPort.save(archived);
            archivedSlots.add(fp.r503SlotId());
        }

        return new FingerprintCleanupResult(archivedSlots.size(), archivedSlots);
    }
}
