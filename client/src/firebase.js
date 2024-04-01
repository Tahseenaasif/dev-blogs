// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2fc6d.firebaseapp.com",
  projectId: "mern-blog-2fc6d",
  storageBucket: "mern-blog-2fc6d.appspot.com",
  messagingSenderId: "512354201749",
  appId: "1:512354201749:web:e6c090c948e4b669832b9c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);