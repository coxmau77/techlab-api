/**
 * Error personalizado para recursos no encontrados (404)
 */
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.isOperational = true;
  }
}

/**
 * Error personalizado para solicitudes incorrectas (400)
 */
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    this.isOperational = true;
  }
}

/**
 * Error personalizado para acceso no autorizado (401)
 */
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
    this.isOperational = true;
  }
}

/**
 * Error personalizado para acceso prohibido (403)
 */
export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
    this.isOperational = true;
  }
}

/**
 * Error personalizado para errores internos del servidor (500)
 */
export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
    this.isOperational = true;
  }
}
