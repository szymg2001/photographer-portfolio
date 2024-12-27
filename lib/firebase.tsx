import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDs59jsLljh0HOoG7qZoie6VQzrOWc32J4",
  authDomain: "photography-41e20.firebaseapp.com",
  projectId: "photography-41e20",
  storageBucket: "photography-41e20.firebasestorage.app",
  messagingSenderId: "1054005310774",
  appId: "1:1054005310774:web:28f1422f29ab4ea448af97",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, getFirestore, storage };
