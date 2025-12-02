import { NotFoundError } from "../utils/errors.js";

/**
 * Manejo de errores en modo desarrollo
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Manejo de errores en modo producción
 */
const sendErrorProd = (err, res) => {
  // Errores operacionales, confiables: enviar mensaje al cliente
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    // Errores de programación u otros errores desconocidos: no filtrar detalles
    console.error("ERROR 💥", err);
    res.status(500).json({
      success: false,
      message: "Algo salió mal. Por favor, inténtalo más tarde.",
    });
  }
};

/**
 * Manejo de errores global
 */
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    // Manejar errores específicos
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

/**
 * Manejo de errores de casting de MongoDB
 */
const handleCastErrorDB = (err) => {
  const message = `Valor inválido ${err.value} para ${err.path}`;
  return new BadRequestError(message);
};

/**
 * Manejo de errores de duplicados en MongoDB
 */
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Campo duplicado: ${value}. Por favor, usa otro valor.`;
  return new BadRequestError(message);
};

/**
 * Manejo de errores de validación en MongoDB
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Datos de entrada inválidos. ${errors.join(". ")}`;
  return new BadRequestError(message);
};

/**
 * Manejo de errores JWT
 */
const handleJWTError = () =>
  new UnauthorizedError("Por favor, inicia sesión para obtener acceso.");

/**
 * Manejo de errores JWT expirados
 */
const handleJWTExpiredError = () =>
  new UnauthorizedError(
    "Tu token ha expirado. Por favor, inicia sesión nuevamente."
  );
