import express from "express";

// Instruments
import { app } from "./server";
import { getPort, logger, logError, NotFoundError, validationErrorLogger, notFoundErrorLogger } from "./utils";

// Routers
import { users, login, logout, classes, lessons } from "./routers";

const PORT = getPort();

app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV !== "production") {
  app.use(logger);
}

app.use("/users", users);
app.use("/login", login);
app.use("/logout", logout);
app.use("/classes", classes);
app.use("/lessons", lessons);

app.use("*", (req, res, next) => {
  const message = `${req.method}: ${req.originalUrl}`;
  next(new NotFoundError(message, 404));
});

app.use((error, req, res, next) => {
  if (error) {
    switch (error.name) {
      case "NotFoundError": {
        notFoundErrorLogger.error(error.message);
        return res.status(error.statusCode).json({
          message: error.message
        });
      }
      case "ValidationError": {
        const message = `${req.method}: ${req.originalUrl} [${error.message}]`;
        validationErrorLogger.error(message);
        return res.status(error.statusCode).json({
          message: error.message
        });
      }
      default: {
        logError(error);
        res.status(500).json({
          message: "some server error"
        });
      }
    }
  } else {
    next();
  }
});

app.listen(PORT, () => {
  //eslint-disable-next-line
  console.log(`Server API is up on port ${PORT}`);
});
