// File: index.ts
// Purpose: Application entry point
// All Rights Reserved. Arodi Emmanuel

import dotenv from 'dotenv';
import { createApp } from './config/app.js';
import {
  composeRelayModule,
  composeAccessModule,
  composeFingerprintModule,
} from './config/composition.js';
import { logger } from './infrastructure/logging/logger.js';

dotenv.config();

async function bootstrap() {
  try {
    const relayController = await composeRelayModule();
    const accessController = await composeAccessModule();
    const fingerprintController = await composeFingerprintModule();
    const app = createApp(
      relayController,
      accessController,
      fingerprintController
    );

    const port = process.env.PORT || 3001;

    app.listen(port, () => {
      logger.info(`Hardware service running on port ${port}`);
      logger.info(
        `Mode: ${process.env.MOCK_MODE === 'true' ? 'MOCK' : 'REAL'}`
      );
    });
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
