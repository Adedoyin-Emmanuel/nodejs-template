import winston from "winston";

const { combine, timestamp, json } = winston.format;



const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      dirname: "logs",
      filename: "error.log",
      level: "error",
    }),

    new winston.transports.File({
      dirname: "logs",
      filename: "combined.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.colorize(),
    })
  );
}

export default logger;
