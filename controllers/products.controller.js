import * as service from "../services/products.service.js";
import { catchAsync } from "../utils/catchAsync.js";

/**
 * Obtener todos los productos del usuario autenticado
 */
export const getAllProducts = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const products = await service.getAllProducts(userId);
  res.status(200).json({
    success: true,
    data: products,
    count: products.length,
  });
});

/**
 * Obtener un producto por ID (público)
 */
export const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await service.getProductById(id);
  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * Crear un nuevo producto
 */
export const createProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const data = req.body;
  const id = await service.createProduct(data, userId);
  res.status(201).json({
    success: true,
    message: "Producto creado exitosamente",
    data: { id },
  });
});

/**
 * Actualizar un producto
 */
export const updateProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const data = req.body;
  const updatedId = await service.updateProduct(id, data, userId);
  res.status(200).json({
    success: true,
    message: "Producto actualizado exitosamente",
    data: { id: updatedId },
  });
});

/**
 * Eliminar un producto
 */
export const deleteProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  await service.deleteProduct(id, userId);
  res.status(200).json({
    success: true,
    message: "Producto eliminado exitosamente",
  });
});



