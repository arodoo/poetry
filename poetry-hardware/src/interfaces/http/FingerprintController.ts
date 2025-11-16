// File: FingerprintController.ts
// Purpose: Main controller for fingerprint operations. Delegates
// to specialized handlers for enrollment and template mgmt.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../application/ports/FingerprintPort.js';
import { FingerprintEnrollmentHandler } from './FingerprintEnrollmentHandler.js';
import { FingerprintTemplateHandler } from './FingerprintTemplateHandler.js';

export class FingerprintController {
  private enrollmentHandler: FingerprintEnrollmentHandler;
  private templateHandler: FingerprintTemplateHandler;

  constructor(fingerprintPort: FingerprintPort) {
    this.enrollmentHandler = new FingerprintEnrollmentHandler(
      fingerprintPort
    );
    this.templateHandler = new FingerprintTemplateHandler(
      fingerprintPort
    );
  }

  enroll = (req: Request, res: Response): Promise<void> => {
    return this.enrollmentHandler.enroll(req, res);
  };

  verify = (req: Request, res: Response): Promise<void> => {
    return this.enrollmentHandler.verify(req, res);
  };

  deleteTemplate = (req: Request, res: Response): Promise<void> => {
    return this.templateHandler.deleteTemplate(req, res);
  };

  getTemplateCount = (req: Request, res: Response): Promise<void> => {
    return this.templateHandler.getTemplateCount(req, res);
  };
}
