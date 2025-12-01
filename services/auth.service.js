import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userModel from "../models/users.model.js";
import { BadRequestError, UnauthorizedError } from "../utils/errors.js";

dotenv.config();

/**
 * Validar credenciales de usuario
 */
export const validateCredentials = async (username, password) => {
  const user = await userModel.findByUsername(username);
  if (!user) {
    return null;
  }

  const isPasswordValid = await userModel.verifyPassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Generar token JWT
 */
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

/**
 * Registrar un nuevo usuario
 */
export const register = async (username, email, password) => {
  const existingUser = await userModel.findByUsername(username);
  if (existingUser) {
    throw new BadRequestError("El nombre de usuario ya está en uso");
  }

  const existingEmail = await userModel.findByEmail(email);
  if (existingEmail) {
    throw new BadRequestError("El email ya está registrado");
  }

  const newUser = await userModel.create({
    username,
    email,
    password,
  });

  const token = generateToken(newUser);

  return {
    token,
    user: newUser,
  };
};

/**
 * Login: validar credenciales y generar token
 */
export const login = async (username, password) => {
  const user = await validateCredentials(username, password);
  if (!user) {
    throw new UnauthorizedError("Credenciales inválidas");
  }

  const token = generateToken(user);

  return {
    token,
    user,
  };
};


