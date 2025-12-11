/*
 * File: HardwareUploadRequest.java
 * Purpose: Request DTO for template upload to hardware service.
 * Contains slotId and base64-encoded template data.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.hardware;

import java.util.Base64;

public record HardwareUploadRequest(int slotId, String template) {

    public static HardwareUploadRequest of(int slotId, byte[] templateBytes) {
        String encoded = Base64.getEncoder().encodeToString(templateBytes);
        return new HardwareUploadRequest(slotId, encoded);
    }
}
