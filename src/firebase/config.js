// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
// Reemplaza estos valores con los de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2She7vzAfbjkuea1p7vkXXsN8jg9NWO8",
  authDomain: "control-material-7b4d7.firebaseapp.com",
  projectId: "control-material-7b4d7",
  storageBucket: "control-material-7b4d7.firebasestorage.app",
  messagingSenderId: "650193722396",
  appId: "1:650193722396:web:69b06b63b083b06710d3d9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


export default app;