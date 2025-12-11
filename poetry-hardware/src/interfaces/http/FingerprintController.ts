// File: FingerprintController.ts
// Purpose: Main controller for fingerprint operations. Delegates
// to specialized handlers for enrollment and template mgmt.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../application/ports/FingerprintPort.js';
import { FingerprintEnrollmentHandler } from './fingerprint/FingerprintEnrollmentHandler.js';
import { FingerprintTemplateHandler } from './fingerprint/FingerprintTemplateHandler.js';
import { TemplateDownloadHandler } from './fingerprint/TemplateDownloadHandler.js';
import { TemplateUploadHandler } from './fingerprint/TemplateUploadHandler.js';
import { BatchDeleteHandler } from './fingerprint/BatchDeleteHandler.js';
import { AvailableSlotHandler } from './fingerprint/AvailableSlotHandler.js';

export class FingerprintController {
  private enrollmentHandler: FingerprintEnrollmentHandler;
  private templateHandler: FingerprintTemplateHandler;
  private downloadHandler: TemplateDownloadHandler;
  private uploadHandler: TemplateUploadHandler;
  private batchDeleteHandler: BatchDeleteHandler;
  private availableSlotHandler: AvailableSlotHandler;

  constructor(fingerprintPort: FingerprintPort) {
    this.enrollmentHandler = new FingerprintEnrollmentHandler(fingerprintPort);
    this.templateHandler = new FingerprintTemplateHandler(fingerprintPort);
    this.downloadHandler = new TemplateDownloadHandler(fingerprintPort);
    this.uploadHandler = new TemplateUploadHandler(fingerprintPort);
    this.batchDeleteHandler = new BatchDeleteHandler(fingerprintPort);
    this.availableSlotHandler = new AvailableSlotHandler(fingerprintPort);
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

  downloadTemplate = (req: Request, res: Response): Promise<void> => {
    return this.downloadHandler.handle(req, res);
  };

  uploadTemplate = (req: Request, res: Response): Promise<void> => {
    return this.uploadHandler.handle(req, res);
  };

  deleteBatch = (req: Request, res: Response): Promise<void> => {
    return this.batchDeleteHandler.handle(req, res);
  };

  getAvailableSlot = (req: Request, res: Response): Promise<void> => {
    return this.availableSlotHandler.handle(req, res);
  };
}

