import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importar Firestore
import { getStorage } from "firebase/storage"; // Importar Storage

const firebaseConfig = {
  apiKey: "AIzaSyBfjO9K6aS6-5NdPqZtjKO85uScUc7AMO8",
  authDomain: "viaje-fotografico.firebaseapp.com",
  projectId: "viaje-fotografico",
  storageBucket: "viaje-fotografico.appspot.com",
  messagingSenderId: "914911696957",
  appId: "1:914911696957:web:9a6da479f6e57d12033254",
  measurementId: "G-BNVRV3PCE1"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Inicializar Firestore
const storage = getStorage(app); // Inicializar Storage

export { auth, firestore, storage };
