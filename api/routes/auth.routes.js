import { Router } from "express";
import * as controller from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

// Ruta de registro (pública)
router.post("/register", registerValidator, validate, controller.register);

// Ruta de login (pública)
router.post("/login", loginValidator, validate, controller.login);

export default router;
