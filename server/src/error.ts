import * as express from "express";
import { NextFunction } from "express";
const unknownEndpoint = (_req: express.Request, response: express.Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  _request: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "TokenExpiredError"
  ) {
    return response.status(401).json({
      error: "invalid token",
    });
  }
 
  next(error);
  return;
};

export default {
  unknownEndpoint,
  errorHandler,
};
