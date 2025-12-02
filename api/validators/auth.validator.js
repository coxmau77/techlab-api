import { body } from "express-validator";

/**
 * Validación para registro de usuario
 */
export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es requerido")
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El email no es válido"),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

/**
 * Validación para login de usuario
 */
export const loginValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es requerido"),

  body("password").notEmpty().withMessage("La contraseña es requerida"),
];
