import { body, param } from "express-validator";

/**
 * Validación para creación/actualización de productos
 */
export const productValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto es requerido")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  body("category").trim().notEmpty().withMessage("La categoría es requerida"),

  body("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número positivo"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres"),
];

/**
 * Validación para ID de producto en parámetros
 */
export const productIdValidator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El ID del producto es requerido")
    .isMongoId()
    .withMessage("El ID del producto no es válido"),
];
