import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/errors.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  // Lanza un error de solicitud incorrecta con los detalles de la validación
  throw new BadRequestError(
    `Error de validación: ${errors
      .array()
      .map((e) => e.msg)
      .join(", ")}`
  );
};
