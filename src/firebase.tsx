// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING,
  appId: import.meta.env.VITE_FB_APP_ID,
};

if(!firebaseConfig.apiKey) {
  console.error('Firebase API Key가 존재하지 않습니다.')
  alert('Firebase API Key가 존재하지 않습니다.')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const adminApp = initializeApp(firebaseConfig, "Admin");
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
