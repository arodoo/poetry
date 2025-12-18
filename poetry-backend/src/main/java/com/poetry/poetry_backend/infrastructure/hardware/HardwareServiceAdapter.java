/*
 * File: HardwareServiceAdapter.java
 * Purpose: Infrastructure adapter implementing HardwareServicePort.
 * Uses HttpClientPort to call poetry-hardware for fingerprint operations.
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
    private static final String FP_API = "/api/fingerprint";

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
        String url = baseUrl + FP_API + "/templates/delete-batch";
        var request = new HardwareBatchDeleteRequest(slotIds);
        try {
            var response = httpClient.post(
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
        String url = baseUrl + FP_API + "/template";
        var request = HardwareUploadRequest.of(slotId, template);
        try {
            var response = httpClient.post(
                    url, request, Map.of(), HardwareUploadResponse.class);
            log.info("Hardware upload slot {}: {}", slotId, response.success());
            return response.success();
        } catch (Exception e) {
            log.error("Hardware upload failed slot {}: {}", slotId, e.getMessage());
            return false;
        }
    }

    @Override
    public int findAvailableSlot() {
        String url = baseUrl + FP_API + "/available-slot";
        try {
            var response = httpClient.get(
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
