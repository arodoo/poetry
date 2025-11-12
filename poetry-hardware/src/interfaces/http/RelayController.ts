// File: RelayController.ts
// Purpose: REST API controller for relay operations
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { ActivateRelayUseCase } from '../../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../../application/usecases/DeactivateRelayUseCase.js';
import { GetRelayStatusUseCase } from '../../application/usecases/GetRelayStatusUseCase.js';
import { RelayChannelId } from '../../domain/relay/RelayChannel.js';
import { logger } from '../../infrastructure/logging/logger.js';

export class RelayController {
  constructor(
    private activateUseCase: ActivateRelayUseCase,
    private deactivateUseCase: DeactivateRelayUseCase,
    private getStatusUseCase: GetRelayStatusUseCase
  ) {}

  activateChannel = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const channelId = parseInt(req.params.id, 10) as RelayChannelId;

      if (channelId < 1 || channelId > 4) {
        res.status(400).json({
          error: 'relay.channel.invalid',
          message: 'Channel ID must be between 1 and 4',
        });
        return;
      }

      await this.activateUseCase.execute(channelId);
      res.status(200).json({
        success: true,
        channelId,
        state: 'active',
      });
    } catch (error) {
      logger.error('Error activating channel:', error);
      res.status(500).json({
        error: 'relay.activation.failed',
      });
    }
  };

  deactivateChannel = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const channelId = parseInt(req.params.id, 10) as RelayChannelId;

      if (channelId < 1 || channelId > 4) {
        res.status(400).json({
          error: 'relay.channel.invalid',
        });
        return;
      }

      await this.deactivateUseCase.execute(channelId);
      res.status(200).json({
        success: true,
        channelId,
        state: 'inactive',
      });
    } catch (error) {
      logger.error('Error deactivating channel:', error);
      res.status(500).json({
        error: 'relay.deactivation.failed',
      });
    }
  };

  getStatus = async (_req: Request, res: Response): Promise<void> => {
    try {
      const status = this.getStatusUseCase.execute();
      res.status(200).json({ channels: status });
    } catch (error) {
      logger.error('Error getting status:', error);
      res.status(500).json({
        error: 'relay.status.failed',
      });
    }
  };
}
