import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

// Configuración de Firebase
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || "talento-tech-test",
  apiKey:
    process.env.FIREBASE_API_KEY || "AIzaSyC6d6ZJ7ZV4Sr3tFsmfFTE-ONy6yK89bU8",
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN || "talento-tech-test.firebaseapp.com",
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET ||
    "talento-tech-test.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "407716496117",
  appId:
    process.env.FIREBASE_APP_ID || "1:407716496117:web:dfd8d0d8c9fcc592a17bbc",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

console.log("✅ Firebase conectado correctamente");
