import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Importar rutas
import productsRoutes from "../routes/products.routes.js";
import authRoutes from "../routes/auth.routes.js";

import { errorHandler } from "../middlewares/error.handler.js";
import { NotFoundError } from "../utils/errors.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Rutas
app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  next(
    new NotFoundError(
      `No se puede encontrar ${req.originalUrl} en este servidor.`
    )
  );
});

// Manejo de errores global
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
