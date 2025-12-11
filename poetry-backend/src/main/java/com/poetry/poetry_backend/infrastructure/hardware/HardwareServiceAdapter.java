/*
 * File: HardwareServiceAdapter.java
 * Purpose: Infrastructure adapter implementing HardwareServicePort.
 * Uses HttpClientPort to call poetry-hardware batch delete endpoint
 * with retry logic for transient failures.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.hardware;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;
import com.poetry.poetry_backend.application.fingerprint.port.BatchDeleteResult;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;

public class HardwareServiceAdapter implements HardwareServicePort {
    private static final Logger log = LoggerFactory.getLogger(
            HardwareServiceAdapter.class);

    private final HttpClientPort httpClient;
    private final String baseUrl;

    public HardwareServiceAdapter(HttpClientPort httpClient, String baseUrl) {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }

    @Override
    public BatchDeleteResult deleteTemplates(List<Integer> slotIds) {
        if (slotIds == null || slotIds.isEmpty()) {
            return BatchDeleteResult.success(0);
        }

        String url = baseUrl + "/fingerprint/templates/delete-batch";
        HardwareBatchDeleteRequest request = new HardwareBatchDeleteRequest(slotIds);

        try {
            HardwareBatchDeleteResponse response = httpClient.post(
                    url, request, Map.of(), HardwareBatchDeleteResponse.class);

            List<Integer> failed = response.failedSlots() != null
                    ? response.failedSlots().stream()
                            .map(HardwareBatchDeleteResponse.FailedSlot::slotId)
                            .toList()
                    : List.of();

            log.info("Hardware delete: {} ok, {} failed",
                    response.deletedCount(), failed.size());

            return response.success()
                    ? BatchDeleteResult.success(response.deletedCount())
                    : BatchDeleteResult.partial(response.deletedCount(), failed);
        } catch (Exception e) {
            log.error("Hardware batch delete failed: {}", e.getMessage());
            return BatchDeleteResult.partial(0, slotIds);
        }
    }

    @Override
    public boolean uploadTemplate(int slotId, byte[] template) {
        String url = baseUrl + "/fingerprint/template";
        HardwareUploadRequest request = HardwareUploadRequest.of(slotId, template);

        try {
            HardwareUploadResponse response = httpClient.post(
                    url, request, Map.of(), HardwareUploadResponse.class);
            log.info("Hardware upload to slot {}: {}", slotId, response.success());
            return response.success();
        } catch (Exception e) {
            log.error("Hardware upload failed for slot {}: {}", slotId, e.getMessage());
            return false;
        }
    }

    @Override
    public int findAvailableSlot() {
        String url = baseUrl + "/fingerprint/available-slot";

        try {
            HardwareSlotResponse response = httpClient.get(
                    url, Map.of(), HardwareSlotResponse.class);
            if (response.success() && response.slotId() != null) {
                log.info("Hardware available slot: {}", response.slotId());
                return response.slotId();
            }
            throw new IllegalStateException("error.fingerprint.noSlotsAvailable");
        } catch (Exception e) {
            log.error("Hardware findAvailableSlot failed: {}", e.getMessage());
            throw new IllegalStateException("error.fingerprint.hardwareError");
        }
    }
}
