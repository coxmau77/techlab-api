import * as model from "../models/products.model.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../utils/errors.js";

/**
 * Obtener todos los productos de un usuario
 */
export const getAllProducts = async (userId) => {
  if (!userId) {
    throw new BadRequestError("ID de usuario es requerido");
  }
  return await model.getAll(userId);
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (id) => {
  const product = await model.getById(id);
  if (!product) {
    throw new NotFoundError("Producto no encontrado");
  }
  return product;
};

/**
 * Crear un nuevo producto
 */
export const createProduct = async (data, userId) => {
  if (!userId) {
    throw new BadRequestError("ID de usuario es requerido para crear un producto");
  }
  return await model.create({ ...data, userId });
};

/**
 * Actualizar un producto
 */
export const updateProduct = async (id, data, userId) => {
  const existingProduct = await model.getById(id);
  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  // Verificar que el usuario es el dueño del producto
  if (existingProduct.userId !== userId) {
    throw new ForbiddenError("No tienes permiso para modificar este producto");
  }

  return await model.update(id, data);
};

/**
 * Eliminar un producto
 */
export const deleteProduct = async (id, userId) => {
  const existingProduct = await model.getById(id);
  if (!existingProduct) {
    throw new NotFoundError("Producto no encontrado");
  }

  // Verificar que el usuario es el dueño del producto
  if (existingProduct.userId !== userId) {
    throw new ForbiddenError("No tienes permiso para eliminar este producto");
  }

  return await model.remove(id);
};




