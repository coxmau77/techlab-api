import { db } from "../../config/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import bcrypt from "bcryptjs";

/**
 * Crear un nuevo usuario
 */
export const create = async (userData) => {
  try {
    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, "users"),
      userWithHashedPassword
    );
    return { id: docRef.id, ...userWithHashedPassword };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

/**
 * Buscar usuario por nombre de usuario
 */
export const findByUsername = async (username) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Error al buscar usuario por username:", error);
    throw error;
  }
};

/**
 * Buscar usuario por email
 */
export const findByEmail = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    throw error;
  }
};

/**
 * Verificar contraseña
 */
export const verifyPassword = async (inputPassword, storedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, storedPassword);
  } catch (error) {
    console.error("Error al verificar contraseña:", error);
    throw error;
  }
};
