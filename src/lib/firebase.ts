import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa3b6jLh2UUtIRq8zq_i_isBG5DloqzKM",
  authDomain: "maxvalue-5818d.firebaseapp.com",
  projectId: "maxvalue-5818d",
  storageBucket: "maxvalue-5818d.firebasestorage.app",
  messagingSenderId: "20408939483",
  appId: "1:20408939483:web:7e96eecbd3c1d95f4b2dfe",
  measurementId: "G-EPN4VS3SR6"
};

// Initialize Firebase (safely checks if the app is already initialized, standard for Next.js hot-reloads)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics (safely checks if window is defined for Server-Side Rendering)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };
