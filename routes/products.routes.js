import { Router } from "express";
import * as controller from "../controllers/products.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from "../validators/products.validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

// Ruta pública (no requiere autenticación)
router.get("/:id", productIdValidator, validate, controller.getProductById);

// Middleware de autenticación para todas las rutas siguientes
router.use(authMiddleware);

// Rutas protegidas (requieren autenticación JWT)
router.get("/", controller.getAllProducts);
router.post("/", createProductValidator, validate, controller.createProduct);
router.put(
  "/:id",
  updateProductValidator,
  validate,
  controller.updateProduct
);
router.delete(
  "/:id",
  productIdValidator,
  validate,
  controller.deleteProduct
);

export default router;


