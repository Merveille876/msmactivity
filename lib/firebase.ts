import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tes informations Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGr8pLLoxdlo09F0X1FZbndsWWUzu2Bd8",
  authDomain: "msm-site-web.firebaseapp.com",
  projectId: "msm-site-web",
  storageBucket: "msm-site-web.firebasestorage.app",
  messagingSenderId: "431810026",
  appId: "1:431810026:web:1036eb603c1d721e233e93",
  measurementId: "G-EHTC2FSF23",
};

// Initialise Firebase seulement une fois
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firestore pour l’utiliser dans ton code
export const db = getFirestore(app);
