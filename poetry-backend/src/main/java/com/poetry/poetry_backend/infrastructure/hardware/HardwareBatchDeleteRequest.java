/*
 * File: HardwareBatchDeleteRequest.java
 * Purpose: Request DTO for batch template deletion to hardware service.
 * Serialized as JSON body for POST /fingerprint/templates/delete-batch.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.hardware;

import java.util.List;

public record HardwareBatchDeleteRequest(List<Integer> slotIds) {
}
