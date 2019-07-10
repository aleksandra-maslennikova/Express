import { createLogger, transports, format } from "winston";
const { combine, timestamp, printf } = format;

const errorFormat = printf(({ message, timestamp }) => {
  return `${timestamp},  ${message}`;
});

export const errorLogger = createLogger({
  level: "debug",
  format: combine(timestamp(), errorFormat),
  transports: [
    new transports.File({
      filename: "logs/error.log",
      level: "error"
    })
  ]
});

export const validationErrorLogger = createLogger({
  level: "debug",
  format: combine(timestamp(), errorFormat),
  transports: [
    new transports.File({
      filename: "logs/validation_errors.log",
      level: "error"
    })
  ]
});

export const notFoundErrorLogger = createLogger({
  level: "debug",
  format: combine(timestamp(), errorFormat),
  transports: [
    new transports.File({
      filename: "logs/not_found_errors.log",
      level: "error"
    })
  ]
});

export const logError = error => {
  if (process.env !== "test") {
    const log = `${error.name}: ${error.message}`;
    return errorLogger.error(log);
  }
};
