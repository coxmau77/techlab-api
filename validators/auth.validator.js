import { body } from "express-validator";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Debe proporcionar un email válido")
    .normalizeEmail(),
  body("username")
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const loginValidator = [
  body("username")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es requerido"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("La contraseña es requerida"),
];
