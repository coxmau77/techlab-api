import { db } from "../../config/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

/**
 * Crear un nuevo producto
 */
export const create = async (productData, userId) => {
  try {
    const productWithUser = {
      ...productData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "products"), productWithUser);
    return { id: docRef.id, ...productWithUser };
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

/**
 * Obtener todos los productos de un usuario
 */
export const findAllByUser = async (userId) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 */
export const findById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return null;
    }

    return { id: productDoc.id, ...productDoc.data() };
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    throw error;
  }
};

/**
 * Actualizar un producto
 */
export const update = async (productId, productData) => {
  try {
    const productRef = doc(db, "products", productId);
    const updatedProduct = {
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(productRef, updatedProduct);
    return { id: productId, ...updatedProduct };
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

/**
 * Eliminar un producto
 */
export const remove = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
