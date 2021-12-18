import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      ),
      handleExceptions: false,
      handleRejections: false,
    }),
  ],
});

export default logger;
