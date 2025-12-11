/*
 * File: HardwareServicePort.java
 * Purpose: Port for communicating with the poetry-hardware service.
 * Abstracts HTTP calls to hardware endpoints for fingerprint operations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

import java.util.List;

public interface HardwareServicePort {

    BatchDeleteResult deleteTemplates(List<Integer> slotIds);

    boolean uploadTemplate(int slotId, byte[] template);

    int findAvailableSlot();
}
