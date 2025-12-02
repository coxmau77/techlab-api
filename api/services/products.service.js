import * as productModel from "../models/products.model.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

/**
 * Crear un nuevo producto
 */
export const createProduct = async (productData, userId) => {
  try {
    const product = await productModel.create(productData, userId);
    return product;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new BadRequestError("Error al crear el producto");
  }
};

/**
 * Obtener todos los productos de un usuario
 */
export const getAllProducts = async (userId) => {
  try {
    const products = await productModel.findAllByUser(userId);
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new BadRequestError("Error al obtener los productos");
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (productId) => {
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }
    return product;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Error al obtener el producto");
  }
};

/**
 * Actualizar un producto
 */
export const updateProduct = async (productId, productData) => {
  try {
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError("Producto no encontrado");
    }

    const updatedProduct = await productModel.update(productId, productData);
    return updatedProduct;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Error al actualizar el producto");
  }
};

/**
 * Eliminar un producto
 */
export const deleteProduct = async (productId) => {
  try {
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError("Producto no encontrado");
    }

    await productModel.remove(productId);
    return true;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Error al eliminar el producto");
  }
};
