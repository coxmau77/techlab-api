import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors.js";

/**
 * Middleware para autenticación JWT
 */
export const authenticate = (req, res, next) => {
  // Obtener token del header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(
      new UnauthorizedError("No se proporcionó token de autenticación")
    );
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new UnauthorizedError("Token inválido"));
    } else if (error.name === "TokenExpiredError") {
      next(new UnauthorizedError("Token expirado"));
    } else {
      next(new UnauthorizedError("Error de autenticación"));
    }
  }
};
