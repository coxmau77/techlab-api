import * as service from "../services/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";

/**
 * Registrar un nuevo usuario
 */
export const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const result = await service.register(username, email, password);

  res.status(201).json({
    success: true,
    message: "Usuario registrado exitosamente",
    data: {
      token: result.token,
      user: result.user,
    },
  });
});

/**
 * Login: autenticar usuario y generar token JWT
 */
export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const result = await service.login(username, password);

  res.status(200).json({
    success: true,
    message: "Login exitoso",
    data: {
      token: result.token,
      user: result.user,
    },
  });
});
