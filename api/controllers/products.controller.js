import * as service from "../services/products.service.js";
import { catchAsync } from "../utils/catchAsync.js";

/**
 * Crear un nuevo producto
 */
export const createProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;
  const userId = req.user.id;

  const product = await service.createProduct(productData, userId);

  res.status(201).json({
    success: true,
    message: "Producto creado exitosamente",
    data: product,
  });
});

/**
 * Obtener todos los productos del usuario
 */
export const getAllProducts = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const products = await service.getAllProducts(userId);

  res.status(200).json({
    success: true,
    message: "Productos obtenidos exitosamente",
    data: products,
  });
});

/**
 * Obtener un producto por ID
 */
export const getProductById = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const product = await service.getProductById(productId);

  res.status(200).json({
    success: true,
    message: "Producto obtenido exitosamente",
    data: product,
  });
});

/**
 * Actualizar un producto
 */
export const updateProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const productData = req.body;

  const updatedProduct = await service.updateProduct(productId, productData);

  res.status(200).json({
    success: true,
    message: "Producto actualizado exitosamente",
    data: updatedProduct,
  });
});

/**
 * Eliminar un producto
 */
export const deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;

  await service.deleteProduct(productId);

  res.status(200).json({
    success: true,
    message: "Producto eliminado exitosamente",
  });
});
