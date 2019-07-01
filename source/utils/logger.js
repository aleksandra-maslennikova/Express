const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf } = format;

const loggerFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}:  method: ${
    message.method
  }, payload: ${JSON.stringify(message.payload)}`;
});

const logger = createLogger({
  level: "debug",
  transports: []
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(timestamp(), loggerFormat)
    })
  );
}

export const loggerMiddleware = (req, res, next) => {
  const log = {
    method: req.method,
    payload: req.method === "GET" ? req.query : req.body
  };
  logger.debug(log);
  next();
};
