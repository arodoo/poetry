/*
 * File: ReserveSlotUseCase.java
 * Purpose: Reserves the first available R503 slot (0-1500) before user
 * creation. Returns slotId to frontend for hardware enrollment. Queries
 * hardware service to find slots empty in the actual sensor.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;

public class ReserveSlotUseCase {
  private final HardwareServicePort hardwareService;

  public ReserveSlotUseCase(HardwareServicePort hardwareService) {
    this.hardwareService = hardwareService;
  }

  public Integer execute() {
    return hardwareService.findAvailableSlot();
  }
}
