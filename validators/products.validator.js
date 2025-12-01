import { body, param } from "express-validator";

export const createProductValidator = [
  body("name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto es requerido"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("description").optional().isString(),
];

export const updateProductValidator = [
  param("id").isString().notEmpty().withMessage("El ID del producto es requerido"),
  body("name")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre del producto es requerido"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("description").optional().isString(),
];

export const productIdValidator = [
  param("id").isString().notEmpty().withMessage("El ID del producto es requerido"),
];
