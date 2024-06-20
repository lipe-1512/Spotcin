import pino from 'pino';
import { createLogger, format, transports } from 'winston';

const logger = pino(
  {
    level: process.env.ENV === 'PROD' ? 'info' : 'debug',
  },
  process.stdout
);

export default logger;
