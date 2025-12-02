import { Router } from "express";
import * as controller from "../controllers/products.controller.js";
import {
  productValidator,
  productIdValidator,
} from "../validators/products.validator.js";
import { validate } from "../middlewares/validator.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Todas las rutas de productos requieren autenticación
router.use(authenticate);

// Crear producto
router.post("/", productValidator, validate, controller.createProduct);

// Obtener todos los productos del usuario
router.get("/", controller.getAllProducts);

// Obtener producto por ID
router.get("/:id", productIdValidator, validate, controller.getProductById);

// Actualizar producto
router.put("/:id", productValidator, validate, controller.updateProduct);

// Eliminar producto
router.delete("/:id", productIdValidator, validate, controller.deleteProduct);

export default router;
