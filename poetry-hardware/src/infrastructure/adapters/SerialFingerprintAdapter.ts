// File: SerialFingerprintAdapter.ts
// Purpose: R503 fingerprint sensor adapter. Orchestrates
// enrollment verification and template management.
// All Rights Reserved. Arodi Emmanuel

import { SerialPort } from 'serialport';
import {
  FingerprintPort,
  EnrollResult,
  VerifyResult,
} from '../../application/ports/FingerprintPort.js';
import { logger } from '../logging/logger.js';
import { R503Protocol } from '../protocols/R503Protocol.js';
import { R503PortInitializer, R503Services } from './R503PortInitializer.js';

export class SerialFingerprintAdapter implements FingerprintPort {
  private port: SerialPort | null = null;
  private protocol: R503Protocol;
  private services: R503Services | null = null;

  constructor(private portPath: string) {
    this.protocol = new R503Protocol();
  }

  async initialize(): Promise<void> {
    const initializer = new R503PortInitializer(
      this.portPath,
      this.protocol
    );
    
    const result = await initializer.initialize();
    this.port = result.port;
    this.services = result.services;
  }

  async enroll(templateId: number): Promise<EnrollResult> {
    logger.info(`Starting enrollment for slot ${templateId}`);

    if (!this.services) {
      return { templateId, success: false };
    }

    const success = await this.services.enrollment.enroll(templateId);
    return { templateId, success };
  }

  async verify(): Promise<VerifyResult> {
    if (!this.services) {
      return { matched: false, templateId: null, confidence: 0 };
    }

    return this.services.verification.verify();
  }

  async deleteTemplate(templateId: number): Promise<boolean> {
    if (!this.services) {
      return false;
    }

    return this.services.templateManager.deleteTemplate(templateId);
  }

  async getTemplateCount(): Promise<number> {
    if (!this.services) {
      return 0;
    }

    return this.services.templateManager.getTemplateCount();
  }

  async close(): Promise<void> {
    return new Promise((resolve) => {
      if (this.port?.isOpen) {
        this.port.close(() => {
          logger.info('Fingerprint port closed');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}
