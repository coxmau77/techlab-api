// utils/errors.js

/**
 * @class AppError
 * @extends Error
 * @description Clase base para errores de la aplicación
 * @param {string} message - Mensaje de error
 * @param {number} statusCode - Código de estado HTTP
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * @class BadRequestError
 * @extends AppError
 * @description Error para solicitudes incorrectas (400)
 */
export class BadRequestError extends AppError {
  constructor(message = "Solicitud incorrecta") {
    super(message, 400);
  }
}

/**
 * @class NotFoundError
 * @extends AppError
 * @description Error para recursos no encontrados (404)
 */
export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

/**
 * @class UnauthorizedError
 * @extends AppError
 * @description Error para autenticación fallida (401)
 */
export class UnauthorizedError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 401);
  }
}

/**
 * @class ForbiddenError
 * @extends AppError
 * @description Error para acceso prohibido (403)
 */
export class ForbiddenError extends AppError {
  constructor(message = "Acceso prohibido") {
    super(message, 403);
  }
}
