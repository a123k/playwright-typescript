import { createLogger, transports, format, Logger } from 'winston';
import fs from 'fs';
import path from 'path';

export function logger(scenarioName: string): Logger {
  const logsDir = path.resolve(__dirname, '../../test-results/logs');

  // Ensure directory exists
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  const logFile = path.join(logsDir, `${scenarioName}.log`);

  const log = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf(info => `${info.level}: [${info.timestamp}]: ${info.message}`)
    ),
    transports: [
      new transports.File({ filename: logFile, level: 'info' }),
      new transports.Console({ level: 'info' })
    ],
    exitOnError: false  // Don't exit after logging error so file write can complete
  });

  return log;
}

