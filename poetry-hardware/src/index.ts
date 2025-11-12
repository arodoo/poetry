// File: index.ts
// Purpose: Application entry point
// All Rights Reserved. Arodi Emmanuel

import dotenv from 'dotenv';
import { createApp } from './config/app.js';
import { composeRelayModule } from './config/composition.js';
import { logger } from './infrastructure/logging/logger.js';

dotenv.config();

async function bootstrap() {
  try {
    const relayController = await composeRelayModule();
    const app = createApp(relayController);

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
