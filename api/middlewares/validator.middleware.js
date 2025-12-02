import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/errors.js";

/**
 * Middleware para validación de datos
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return next(new BadRequestError(errorMessages.join(", ")));
  }
  next();
};
